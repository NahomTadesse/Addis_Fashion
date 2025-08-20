// // 'use client';
// // import {
// //     Anchor,
// //     Button,
// //     Checkbox,
// //     Paper,
// //     PasswordInput,
// //     Text,
// //     TextInput,
// //     Title,
// //     LoadingOverlay,
// // } from '@mantine/core';
// // import classes from './AuthenticationImage.module.css';
// // import { useRouter } from 'next/navigation';
// // import { useState } from 'react';
// // import { useCookies } from 'react-cookie';

// // export default function AuthenticationImage() {
// //     const router = useRouter();
// //     const [cookies, setCookie] = useCookies(['userId', 'token']);
// //     const [loading, setLoading] = useState(false);
// //     const [formData, setFormData] = useState({
// //         email: '',
// //         password: '',
// //         remember: false
// //     });

// //     const handleInputChange = (e) => {
// //         const { name, value, checked } = e.target;
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: name === 'remember' ? checked : value
// //         }));
// //     };

// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);

// //         try {
// //             const response = await fetch('https://fashion-api.addispages.com/api/v1/auth/login', {
// //                 method: 'POST',
// //                 headers: {
// //                     'accept': '*/*',
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify({
// //                     principal: formData.email,
// //                     password: formData.password
// //                 })
// //             });

// //             if (!response.ok) {
// //                 throw new Error('Login failed');
// //             }

// //             const data = await response.json();
            
// //             // Set cookies
// //             const cookieOptions = formData.remember ? { 
// //                 path: '/', 
// //                 maxAge: 60 * 60 * 24 * 30 // 30 days
// //             } : { path: '/' };
            
// //             setCookie('userId', data.userId, cookieOptions);
// //             setCookie('token', data.token, cookieOptions);

// //             // Redirect to home or previous page
// //             router.push('/');
// //         } catch (error) {
// //             console.error('Login error:', error);
// //             alert('Login failed. Please check your credentials and try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className={classes.wrapper}>
// //             <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
// //             <Paper className={classes.form} radius={0} p={30} component="form" onSubmit={handleLogin}>
// //                 <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
// //                     Welcome back to Addis Fashion!
// //                 </Title>

// //                 <TextInput 
// //                     label="Email address" 
// //                     placeholder="hello@gmail.com" 
// //                     size="md" 
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <PasswordInput 
// //                     label="Password" 
// //                     placeholder="Your password" 
// //                     mt="md" 
// //                     size="md" 
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <Checkbox 
// //                     label="Keep me logged in" 
// //                     mt="xl" 
// //                     size="md" 
// //                     name="remember"
// //                     checked={formData.remember}
// //                     onChange={handleInputChange}
// //                 />
// //                 <Button fullWidth mt="xl" size="md" type="submit">
// //                     Login
// //                 </Button>

// //                 <Text ta="center" mt="md">
// //                     Don&apos;t have an account?{' '}
// //                     <Anchor<'a'> href="/signup" fw={700} onClick={() => {router.push('/signup')}}>
// //                         Register
// //                     </Anchor>
// //                 </Text>
// //             </Paper>
// //         </div>
// //     );
// // }


// 'use client';
// import {
//   Anchor,
//   Button,
//   Checkbox,
//   Paper,
//   PasswordInput,
//   Text,
//   TextInput,
//   Title,
//   LoadingOverlay,
// } from '@mantine/core';
// import classes from './AuthenticationImage.module.css';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useCookies } from 'react-cookie';

// export default function AuthenticationImage() {
//   const router = useRouter();
//   const [cookies, setCookie] = useCookies(['userId', 'token']);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     remember: false,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'remember' ? checked : value,
//     }));
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('https://fashion-api.addispages.com/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'accept': '*/*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           principal: formData.email,
//           password: formData.password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();

//       if (!data.userId || !data.access_token) {
//         throw new Error('Invalid login response');
//       }

//       const cookieOptions = formData.remember
//         ? {
//             path: '/',
//             maxAge: 60 * 60 * 24 * 30,
//           }
//         : { path: '/' };

//       setCookie('userId', data.userId, cookieOptions);
//       setCookie('token', data.token, cookieOptions);

//       router.push('/');
//     } catch (error) {
//         console.log('error',error)
//       alert('Login failed. Please check your credentials and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={classes.wrapper}>
//       <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
//       <Paper className={classes.form} radius={0} p={30} component="form" onSubmit={handleLogin}>
//         <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
//           Welcome back to Addis Fashion!
//         </Title>

//         <TextInput
//           label="Email address"
//           placeholder="hello@gmail.com"
//           size="md"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           required
//         />
//         <PasswordInput
//           label="Password"
//           placeholder="Your password"
//           mt="md"
//           size="md"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           required
//         />
//         <Checkbox
//           label="Keep me logged in"
//           mt="xl"
//           size="md"
//           name="remember"
//           checked={formData.remember}
//           onChange={handleInputChange}
//         />
//         <Button fullWidth mt="xl" size="md" type="submit">
//           Login
//         </Button>

//         <Text ta="center" mt="md">
//           Don&apos;t have an account?{' '}
//           <Anchor<'a'> href="/signup" fw={700} onClick={() => router.push('/signup')}>
//             Register
//           </Anchor>
//         </Text>
//       </Paper>
//     </div>
//   );
// }

// AuthenticationImage.tsx
'use client';
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  LoadingOverlay,
} from '@mantine/core';
import classes from './AuthenticationImage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function AuthenticationImage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'remember' ? checked : value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://fashion-api.addispages.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          principal: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      if (!data.userId || !data.access_token) {
        throw new Error('Invalid login response');
      }

      // Set cookies with js-cookie
      const cookieOptions = formData.remember ? { 
        expires: 30, // 30 days
        path: '/'
      } : { path: '/' };

      Cookies.set('userId', data.userId, cookieOptions);
      Cookies.set('token', data.access_token, cookieOptions);
      Cookies.set('refresh_token', data.refresh_token, cookieOptions);

      router.push('/');
    } catch (error) {
      console.log('error', error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      <Paper className={classes.form} radius={0} p={30} component="form" onSubmit={handleLogin}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Addis Fashion!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <Checkbox
          label="Keep me logged in"
          mt="xl"
          size="md"
          name="remember"
          checked={formData.remember}
          onChange={handleInputChange}
        />
        <Button fullWidth mt="xl" size="md" type="submit">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="/signup" fw={700} onClick={() => router.push('/signup')}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}