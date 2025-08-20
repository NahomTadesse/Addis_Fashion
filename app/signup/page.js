'use client';

import { useState } from 'react';
import {
  TextInput,
  Button,
  Container,
  Title,
  Notification,
  Card,
  PasswordInput,
  LoadingOverlay,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function SignUp() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['userId', 'token']);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (field) => (e) => {
  setFormData(prev => ({
    ...prev,
    [field]: e.target.value
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://fashion-api.addispages.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: "USER",
          customerId: "string",
          status: "ACTIVE"
        })
      });
 const data = await response.json();
      console.log('ress',data)

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

   
      const loginResponse = await fetch('https://fashion-api.addispages.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'accept': '*/*',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          principal: formData.email,
          password: formData.password
        })
      });

      const loginData = await loginResponse.json();
console.log('logindata',loginData)
      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login after registration failed');
      }

      // Set cookies
      setCookie('userId', loginData.userId, { path: '/' });
      setCookie('token', loginData.token, { path: '/' });

      setNotification({
        title: 'Success!',
        message: 'Registration successful. Redirecting...',
        color: 'green',
      });

      // Redirect to home page after 2 seconds
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setNotification({
        title: 'Error',
        message: error.message || 'Registration failed. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "red",
      backgroundImage: 'url(https://www.shutterstock.com/image-photo/clothes-on-clothing-hanger-600nw-2338282257.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <LoadingOverlay visible={loading}  />
      <Container
        size="xs"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card padding="xl" shadow="md" radius="md" style={{ width: '100%' }}>
          <Title order={2} align="center">Sign Up</Title>
          {notification && (
            <Notification
              title={notification.title}
              color={notification.color}
              onClose={() => setNotification(null)}
              mt="md"
            >
              {notification.message}
            </Notification>
          )}
          <form onSubmit={handleSubmit}>
            <TextInput
              label="First Name"
              required
              value={formData.firstName}
              onChange={handleChange('firstName')}
              mt="md"
            />
            <TextInput
              label="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange('lastName')}
              mt="md"
            />
            <TextInput
              label="Username"
              required
              value={formData.userName}
              onChange={handleChange('userName')}
              mt="md"
            />
            <TextInput
              label="Email"
              required
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              mt="md"
            />
            <TextInput
              label="Phone Number"
              required
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
              mt="md"
            />
            <PasswordInput
              label="Password"
              required
              value={formData.password}
              onChange={handleChange('password')}
              mt="md"
            />
            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Sign Up
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
}