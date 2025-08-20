
// "use client";
// import { 
//   Container, 
//   Title, 
//   Text, 
//   Table, 
//   Button, 
//   Group, 
//   Image, 
//   NumberInput, 
//   ActionIcon, 
//   Badge, 
//   Paper,
//   Stack,
//   Divider,
//   Box,
//   Loader
// } from '@mantine/core';
// import React, { useState, useEffect } from 'react';
// import { IconTrash, IconPlus, IconMinus } from '@tabler/icons-react';
// import { useRouter } from 'next/navigation';
// import classes from './CartPage.module.css';
// import { getValidToken, isValidToken, logout } from '../authService'; // Adjust path as needed

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   color: string;
//   size: string;
// }

// interface ApiCartItem {
//   orderItemId: string;
//   productId: string;
//   userId: string | null;
//   quantity: number;
//   price: number;
//   productName: string;
//   productImage: string;
//   size: string;
//   color: string;
// }

// export default function CartPage() {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   useEffect(() => {
//     // Check authentication first
//     const checkAuth = async () => {
//       if (!isValidToken()) {
//         const token = await getValidToken();
//         if (!token) {
//           router.push('/login');
//           return;
//         }
//       }
//       setAuthChecked(true);
//       fetchCartItems();
//     };

//     checkAuth();
//   }, [router]);

//   const fetchCartItems = async () => {
//     try {
//       const token = await getValidToken();
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('https://fashion-api.addispages.com/api/v1/orderItem/items/all', {
//         headers: {
//           'accept': '*/*',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.status === 401) {
//         // Token expired or invalid
//         logout();
//         router.push('/login');
//         return;
//       }

//       if (!response.ok) {
//         throw new Error('Failed to fetch cart items');
//       }

//       const data: ApiCartItem[] = await response.json();
      
//       // Transform API data to match your cart item structure
//       const transformedItems = data.map(item => ({
//         id: item.orderItemId,
//         name: item.productName,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.productImage.startsWith('/home') 
//           ? `https://fashion-api.addispages.com${item.productImage.replace('/home/orion/dev_fashion_uploads', '/uploads')}`
//           : item.productImage,
//         color: item.color,
//         size: item.size
//       }));

//       setCartItems(transformedItems);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = async (id: string, newQuantity: number) => {
//     try {
//       const token = await getValidToken();
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch(`https://fashion-api.addispages.com/api/v1/orderItem/items/${id}`, {
//         method: 'PUT',
//         headers: {
//           'accept': '*/*',
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ quantity: newQuantity })
//       });

//       if (response.ok) {
//         setCartItems(cartItems.map(item => 
//           item.id === id ? {...item, quantity: newQuantity} : item
//         ));
//       }
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   const removeItem = async (id: string) => {
//     try {
//       const token = await getValidToken();
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch(`https://fashion-api.addispages.com/api/v1/orderItem/items/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'accept': '*/*',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         setCartItems(cartItems.filter(item => item.id !== id));
//       }
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const proceedToCheckout = () => {
//     if (!isValidToken()) {
//       router.push('/login');
//       return;
//     }
//     router.push('/checkout');
//   };

//   const continueShopping = () => {
//     router.push('/products');
//   };

//   if (!authChecked || loading) {
//     return (
//       <Container size="xl" py={40}>
//         <Group justify="center">
//           <Loader size="xl" />
//         </Group>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container size="xl" py={40}>
//         <Paper shadow="sm" p="xl" radius="md" withBorder>
//           <Text size="xl" ta="center" mb="md" c="red">{error}</Text>
//           <Button 
//             fullWidth 
//             size="lg" 
//             onClick={continueShopping}
//           >
//             Continue Shopping
//           </Button>
//         </Paper>
//       </Container>
//     );
//   }

//   // Calculate totals
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shipping = subtotal > 100 ? 0 : 9.99;
//   const tax = subtotal * 0.08; // 8% tax
//   const total = subtotal + shipping + tax;

//   return (
//     <Container size="xl" py={40}>
//       <Title order={1} mb={30}>Your Shopping Cart</Title>
      
//       {cartItems.length === 0 ? (
//         <Paper shadow="sm" p="xl" radius="md" withBorder>
//           <Text size="xl" ta="center" mb="md">Your cart is empty</Text>
//           <Button 
//             fullWidth 
//             size="lg" 
//             onClick={continueShopping}
//           >
//             Continue Shopping
//           </Button>
//         </Paper>
//       ) : (
//         <Group align="flex-start" gap="xl" wrap="nowrap">
//           <Paper shadow="sm" p="md" radius="md" withBorder className={classes.cartItems}>
//             <Table striped highlightOnHover>
//               <Table.Thead>
//                 <Table.Tr>
//                   <Table.Th>Product</Table.Th>
//                   <Table.Th>Price</Table.Th>
//                   <Table.Th>Quantity</Table.Th>
//                   <Table.Th>Total</Table.Th>
//                   <Table.Th></Table.Th>
//                 </Table.Tr>
//               </Table.Thead>
//               <Table.Tbody>
//                 {cartItems.map((item) => (
//                   <Table.Tr key={item.id}>
//                     <Table.Td>
//                       <Group gap="sm">
//                         <Image
//                           src={item.image}
//                           width={80}
//                           height={80}
//                           alt={item.name}
//                           radius="sm"
                       
//                         />
//                         <Stack gap={4}>
//                           <Text fw={500}>{item.name}</Text>
//                           <Group gap="xs">
//                             <Badge variant="outline">{item.color}</Badge>
//                             <Badge variant="outline">{item.size}</Badge>
//                           </Group>
//                         </Stack>
//                       </Group>
//                     </Table.Td>
//                     <Table.Td>{item.price.toFixed(2)}ETB</Table.Td>
//                     <Table.Td>
//                       <Group gap={4}>
//                         <ActionIcon 
//                           variant="default" 
//                           onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
//                         >
//                           <IconMinus size={16} />
//                         </ActionIcon>
//                         <NumberInput
//                           min={1}
//                           value={item.quantity}
//                           onChange={(value) => handleQuantityChange(item.id, Number(value))}
//                           style={{ width: 60 }}
//                           hideControls
//                         />
//                         <ActionIcon 
//                           variant="default" 
//                           onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                         >
//                           <IconPlus size={16} />
//                         </ActionIcon>
//                       </Group>
//                     </Table.Td>
//                     <Table.Td>{(item.price * item.quantity).toFixed(2)}ETB</Table.Td>
//                     <Table.Td>
//                       <ActionIcon 
//                         variant="subtle" 
//                         color="red" 
//                         onClick={() => removeItem(item.id)}
//                       >
//                         <IconTrash size={18} />
//                       </ActionIcon>
//                     </Table.Td>
//                   </Table.Tr>
//                 ))}
//               </Table.Tbody>
//             </Table>
            
//             <Group justify="space-between" mt="xl">
//               <Button 
//                 variant="outline" 
//                 onClick={continueShopping}
//               >
//                 Continue Shopping
//               </Button>
//               <Button 
//                 variant="light" 
//                 color="red"
//                 onClick={() => {
//                   // Clear all items from cart
//                   cartItems.forEach(item => removeItem(item.id));
//                 }}
//               >
//                 Clear Cart
//               </Button>
//             </Group>
//           </Paper>

//           <Paper shadow="sm" p="md" radius="md" withBorder className={classes.summary}>
//             <Title order={3} mb="md">Order Summary</Title>
            
//             <Stack gap="sm">
//               <Group justify="space-between">
//                 <Text>Subtotal</Text>
//                 <Text>{subtotal.toFixed(2)}ETB</Text>
//               </Group>
              
//               <Group justify="space-between">
//                 <Text>Shipping</Text>
//                 <Text>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)}ETB`}</Text>
//               </Group>
              
//               <Group justify="space-between">
//                 <Text>Tax (8%)</Text>
//                 <Text>{tax.toFixed(2)}ETB</Text>
//               </Group>
              
//               <Divider my="sm" />
              
//               <Group justify="space-between" fw={700}>
//                 <Text size="lg">Total</Text>
//                 <Text size="lg">{total.toFixed(2)}ETB</Text>
//               </Group>
              
//               <Button 
//                 size="lg" 
//                 mt="md"
//                 onClick={proceedToCheckout}
//                 disabled={!isValidToken()}
//               >
//                 Proceed to Checkout
//               </Button>
              
//               <Text c="dimmed" size="sm" mt="sm">
//                 * Free shipping on orders over 1000 ETB
//               </Text>
//             </Stack>
//           </Paper>
//         </Group>
//       )}
//     </Container>
//   );
// }

// CartPage.tsx
"use client";
import { 
  Container, 
  Title, 
  Text, 
  Table, 
  Button, 
  Group, 
  Image, 
  NumberInput, 
  ActionIcon, 
  Badge, 
  Paper,
  Stack,
  Divider,
  Box,
  Loader
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { IconTrash, IconPlus, IconMinus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import classes from './CartPage.module.css';
import { getValidToken, isValidToken, logout } from '../authService'; // Adjust path as needed

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

interface ApiCartItem {
  orderItemId: string;
  productId: string;
  userId: string | null;
  quantity: number;
  price: number;
  productName: string;
  productImage: string;
  size: string;
  color: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Function to get proper image URL
  const getImageUrl = (path: string): string => {
    if (!path) return '';
    
    // If it's already a full URL, return as is
    if (path.startsWith('http')) {
      return path;
    }
    
    // If it's a server path, extract the filename and use the file endpoint
    const fileName = path.split('/').pop();
    if (fileName) {
      return `https://fashion-api.addispages.com/api/v1/file/${fileName}`;
    }
    
    return '';
  };

  useEffect(() => {
    // Check authentication first
    const checkAuth = async () => {
      if (!isValidToken()) {
        const token = await getValidToken();
        if (!token) {
          router.push('/login');
          return;
        }
      }
      setAuthChecked(true);
      fetchCartItems();
    };

    checkAuth();
  }, [router]);

  const fetchCartItems = async () => {
    try {
      const token = await getValidToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('https://fashion-api.addispages.com/api/v1/orderItem/items/all', {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        // Token expired or invalid
        logout();
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data: ApiCartItem[] = await response.json();
      
      // Transform API data to match your cart item structure
      const transformedItems = data.map(item => ({
        id: item.orderItemId,
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
        image: getImageUrl(item.productImage),
        color: item.color,
        size: item.size
      }));

      setCartItems(transformedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      const token = await getValidToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`https://fashion-api.addispages.com/api/v1/orderItem/items/${id}`, {
        method: 'PUT',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        setCartItems(cartItems.map(item => 
          item.id === id ? {...item, quantity: newQuantity} : item
        ));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const token = await getValidToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`https://fashion-api.addispages.com/api/v1/orderItem/items/${id}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const proceedToCheckout = () => {
    if (!isValidToken()) {
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  const continueShopping = () => {
    router.push('/products');
  };

  if (!authChecked || loading) {
    return (
      <Container size="xl" py={40}>
        <Group justify="center">
          <Loader size="xl" />
        </Group>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" py={40}>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text size="xl" ta="center" mb="md" c="red">{error}</Text>
          <Button 
            fullWidth 
            size="lg" 
            onClick={continueShopping}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Container size="xl" py={40}>
      <Title order={1} mb={30}>Your Shopping Cart</Title>
      
      {cartItems.length === 0 ? (
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text size="xl" ta="center" mb="md">Your cart is empty</Text>
          <Button 
            fullWidth 
            size="lg" 
            onClick={continueShopping}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Group align="flex-start" gap="xl" wrap="nowrap">
          <Paper shadow="sm" p="md" radius="md" withBorder className={classes.cartItems}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Total</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {cartItems.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Image
                          src={item.image}
                          width={80}
                          height={80}
                          alt={item.name}
                          radius="sm"
                          
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.src = '/placeholder-image.jpg';
                          }}
                        />
                        <Stack gap={4}>
                          <Text fw={500}>{item.name}</Text>
                          <Group gap="xs">
                            <Badge variant="outline">{item.color}</Badge>
                            <Badge variant="outline">{item.size}</Badge>
                          </Group>
                        </Stack>
                      </Group>
                    </Table.Td>
                    <Table.Td>{item.price.toFixed(2)}ETB</Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        <ActionIcon 
                          variant="default" 
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <IconMinus size={16} />
                        </ActionIcon>
                        <NumberInput
                          min={1}
                          value={item.quantity}
                          onChange={(value) => handleQuantityChange(item.id, Number(value))}
                          style={{ width: 60 }}
                          hideControls
                        />
                        <ActionIcon 
                          variant="default" 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <IconPlus size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                    <Table.Td>{(item.price * item.quantity).toFixed(2)}ETB</Table.Td>
                    <Table.Td>
                      <ActionIcon 
                        variant="subtle" 
                        color="red" 
                        onClick={() => removeItem(item.id)}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            
            <Group justify="space-between" mt="xl">
              <Button 
                variant="outline" 
                onClick={continueShopping}
              >
                Continue Shopping
              </Button>
              <Button 
                variant="light" 
                color="red"
                onClick={() => {
                  // Clear all items from cart
                  cartItems.forEach(item => removeItem(item.id));
                }}
              >
                Clear Cart
              </Button>
            </Group>
          </Paper>

          <Paper shadow="sm" p="md" radius="md" withBorder className={classes.summary}>
            <Title order={3} mb="md">Order Summary</Title>
            
            <Stack gap="sm">
              <Group justify="space-between">
                <Text>Subtotal</Text>
                <Text>{subtotal.toFixed(2)}ETB</Text>
              </Group>
              
              <Group justify="space-between">
                <Text>Shipping</Text>
                <Text>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)}ETB`}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text>Tax (8%)</Text>
                <Text>{tax.toFixed(2)}ETB</Text>
              </Group>
              
              <Divider my="sm" />
              
              <Group justify="space-between" fw={700}>
                <Text size="lg">Total</Text>
                <Text size="lg">{total.toFixed(2)}ETB</Text>
              </Group>
              
              <Button 
                size="lg" 
                mt="md"
                onClick={proceedToCheckout}
                disabled={!isValidToken()}
              >
                Proceed to Checkout
              </Button>
              
              <Text c="dimmed" size="sm" mt="sm">
                * Free shipping on orders over 1000 ETB
              </Text>
            </Stack>
          </Paper>
        </Group>
      )}
    </Container>
  );
}