// auth.ts
import Cookies from 'js-cookie';

export interface AuthData {
  userId: string;
  token: string;
  refresh_token: string;
}

export const getAuthToken = (): string | null => {
  const token = Cookies.get('token');
  return token || null;
};

export const getUserId = (): string | null => {
  const userId = Cookies.get('userId');
  return userId || null;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

export const isValidToken = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  return !isTokenExpired(token);
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) return null;

    const response = await fetch('https://fashion-api.addispages.com/api/v1/auth/refresh', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      },
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    
    if (data.access_token) {
      Cookies.set('token', data.access_token, { path: '/' });
      return data.access_token;
    }
    
    return null;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};

export const getValidToken = async (): Promise<string | null> => {
  if (!isValidToken()) {
    const newToken = await refreshToken();
    if (!newToken) {
      // Redirect to login if refresh also fails
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
    return newToken;
  }
  
  return getAuthToken();
};

export const logout = (): void => {
  Cookies.remove('token', { path: '/' });
  Cookies.remove('userId', { path: '/' });
  Cookies.remove('refresh_token', { path: '/' });
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};