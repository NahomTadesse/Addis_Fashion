// 'use client';
// import { 
//   Container, 
//   Image, 
//   Title, 
//   Text, 
//   Badge, 
//   Button, 
//   Group, 
//   Stack, 
//   Divider, 
//   Select, 
//   SimpleGrid,
//   Rating, 
//   Tabs, 
//   Box,
//   NumberInput,
//   ActionIcon
// } from '@mantine/core';
// import { IconHeart, IconShoppingCart, IconMinus, IconPlus } from '@tabler/icons-react';
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import classes from './ProductPage.module.css';
// import { useCookies } from 'react-cookie';
// import { useRouter } from 'next/navigation';
// import { getValidToken, isValidToken, logout } from '../authService';
// export default function ProductPage() {
//   const searchParams = useSearchParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
// const router = useRouter();
//   // State for selections
//    const [cookies, setCookie] = useCookies(['userId', 'token'])
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState('');
//   const [isWishlisted, setIsWishlisted] = useState(false);


//     useEffect(() => {
//       // Check authentication first
//       const checkAuth = async () => {
//         if (!isValidToken()) {
//           const token = await getValidToken();
//           if (!token) {
//             router.push('/login');
//             return;
//           }
//         }
//         setAuthChecked(true);
//         fetchCartItems();
//       };
  
//       checkAuth();
//     }, [router]);  useEffect(() => {
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


// useEffect(() => {
//     if (searchParams) {
//       const productParam = searchParams.get('product');
//       if (productParam) {
//         try {
//           const decodedProduct = JSON.parse(decodeURIComponent(productParam));
//           setProduct(decodedProduct);
          
//           // Set initial selections
//           if (decodedProduct.variants?.length > 0) {
//             setSelectedColor(decodedProduct.variants[0].color);
//             setSelectedSize(decodedProduct.variants[0].size);
//           }
          
//           setActiveImage(`https://fashion-api.addispages.com/api/v1/file/${decodedProduct.imageUrl.split('_uploads/')[1]}`);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error parsing product data:', error);
//           setLoading(false);
//         }
//       }
//     }
//   }, [searchParams]);

//   // Handle add to cart
// const handleAddToCart = async () => {
//     if (!product) return;
    
//     const token = await getValidToken();


//       if (!token) {
//         router.push('/login');
//         return;
//       }
//     // Find the selected variant
//     const selectedVariant = product.variants.find(v => 
//       v.color === selectedColor && v.size === selectedSize
//     );

//     if (!selectedVariant) {
//       alert('Please select both color and size');
//       return;
//     }

//     try {
//       // console.log('order body',{
//       //     quantity: quantity,
//       //     price: product.price,
//       //     productId: product.productId,
//       //     variantId: selectedVariant.variantId,
//       //     userId: cookies.userId
//       //   })
//       const response = await fetch('https://fashion-api.addispages.com/api/v1/orderItem', {
//         method: 'POST',
//         headers: {
//           'accept': '*/*',
//           'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
        
//         },
//         body: JSON.stringify({
//           quantity: quantity,
//           price: product.price,
//           productId: product.productId,
//           variantId: selectedVariant.variantId,
//           userId: cookies.userId
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add to cart');
//       }

//       const data = await response.json();
//       console.log('dataaa',data)
//       alert(`${quantity} ${product.name} (${selectedSize}/${selectedColor}) added to cart!`);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add to cart. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <Container size="xl" py={40}>
//         <Text ta="center">Loading product...</Text>
//       </Container>
//     );
//   }

//   if (!product) {
//     return (
//       <Container size="xl" py={40}>
//         <Text ta="center">Product not found</Text>
//       </Container>
//     );
//   }

//   // Extract unique colors and sizes from variants
//   const colors = [...new Set(product.variants?.map(v => v.color) || [])];
//   const sizes = [...new Set(product.variants?.map(v => v.size) || [])];

//   return (
//     <Container size="xl" py={40} className={classes.root}>
//       <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
//         {/* Product Images */}
//         <div>
//           <div className={classes.mainImageContainer}>
//             <Image 
//               src={activeImage} 
//               alt={product.name} 
//               className={classes.mainImage}
//               radius="md"
//             />
//           </div>
          
//           {/* If you have multiple images, you can add thumbnails here */}
//           {/* <Group gap="sm" mt="md" wrap="nowrap">
//             {product.images.map((image, index) => (
//               <div 
//                 key={index} 
//                 className={`${classes.thumbnail} ${activeImage === image ? classes.activeThumbnail : ''}`}
//                 onClick={() => setActiveImage(image)}
//               >
//                 <Image 
//                   src={image} 
//                   alt={`${product.name} thumbnail ${index + 1}`} 
//                   className={classes.thumbnailImage}
//                 />
//               </div>
//             ))}
//           </Group> */}
//         </div>

//         {/* Product Info */}
//         <div>
//           <Stack gap="sm">
//             <Title order={1} className={classes.productTitle}>
//               {product.name}
//             </Title>
            
//             <Group gap="xs">
//               <Badge variant="light" color="teal">{product.categoryId || 'Uncategorized'}</Badge>
//               <Badge variant="light" color={product.stockQuantity > 0 ? 'blue' : 'red'}>
//                 {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
//               </Badge>
//             </Group>

//             <Title order={2}>${product.price.toFixed(2)}</Title>

//             <Text mt="sm" className={classes.productDescription}>
//               {product.description || 'No description available'}
//             </Text>

//             <Divider my="md" />

//             {/* Color Selection */}
//             {colors.length > 0 && (
//               <div>
//                 <Text fw={500} mb="xs">Color: {selectedColor}</Text>
//                 <Group gap="sm">
//                   {colors.map(color => (
//                     <Button
//                       key={color}
//                       variant={selectedColor === color ? 'filled' : 'outline'}
//                       onClick={() => setSelectedColor(color)}
//                       className={classes.colorButton}
//                     >
//                       {color}
//                     </Button>
//                   ))}
//                 </Group>
//               </div>
//             )}

//             {/* Size Selection */}
//             {sizes.length > 0 && (
//               <div>
//                 <Text fw={500} mb="xs">Size: {selectedSize}</Text>
//                 <Group gap="sm">
//                   {sizes.map(size => (
//                     <Button
//                       key={size}
//                       variant={selectedSize === size ? 'filled' : 'outline'}
//                       onClick={() => setSelectedSize(size)}
//                       className={classes.sizeButton}
//                     >
//                       {size}
//                     </Button>
//                   ))}
//                 </Group>
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div>
//               <Text fw={500} mb="xs">Quantity</Text>
//               <Group gap={0}>
//                 <ActionIcon 
//                   variant="default" 
//                   size="xl" 
//                   radius="sm"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 >
//                   <IconMinus size={16} />
//                 </ActionIcon>
//                 <NumberInput
//                   value={quantity}
//                   onChange={(value) => setQuantity(value || 1)}
//                   min={1}
//                   max={product.stockQuantity}
//                   hideControls
//                   className={classes.quantityInput}
//                 />
//                 <ActionIcon 
//                   variant="default" 
//                   size="xl" 
//                   radius="sm"
//                   onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
//                 >
//                   <IconPlus size={16} />
//                 </ActionIcon>
//               </Group>
//             </div>

//             {/* Action Buttons */}
//             <Group mt="xl" grow>
//               <Button
//                 size="lg"
//                 radius="xl"
//                 variant="gradient"
//                 gradient={{ from: 'blue', to: 'cyan' }}
//                 leftSection={<IconShoppingCart size={20} />}
//                 onClick={handleAddToCart}
//                 disabled={product.stockQuantity <= 0}
//               >
//                 Add to Cart
//               </Button>
//               <Button
//                 size="lg"
//                 radius="xl"
//                 variant={isWishlisted ? 'filled' : 'outline'}
//                 color={isWishlisted ? 'red' : 'gray'}
//                 leftSection={<IconHeart size={20} fill={isWishlisted ? 'white' : 'none'} />}
//                 onClick={() => setIsWishlisted(!isWishlisted)}
//               >
//                 {isWishlisted ? 'Wishlisted' : 'Wishlist'}
//               </Button>
//             </Group>
//           </Stack>
//         </div>
//       </SimpleGrid>

//       {/* Product Details Tabs */}
//       <Tabs defaultValue="details" mt={50}>
//         <Tabs.List>
//           <Tabs.Tab value="details">Product Details</Tabs.Tab>
//           <Tabs.Tab value="shipping">Shipping & Returns</Tabs.Tab>
//         </Tabs.List>

//         <Tabs.Panel value="details" pt="xl">
//           <Title order={3} mb="md">About this item</Title>
//           <Text>{product.description || 'No additional details available'}</Text>
//         </Tabs.Panel>

//         <Tabs.Panel value="shipping" pt="xl">
//           <Title order={3} mb="md">Shipping Information</Title>
//           <Text mb="sm">• Free shipping on orders over $100</Text>
//           <Text mb="sm">• Estimated delivery: 3-5 business days</Text>
//         </Tabs.Panel>
//       </Tabs>
//     </Container>
//   );
// }


// app/productPage/ProductPageContent.js
'use client';
import { 
  Container, 
  Image, 
  Title, 
  Text, 
  Badge, 
  Button, 
  Group, 
  Stack, 
  Divider, 
  SimpleGrid,
  NumberInput,
  ActionIcon,
  Tabs
} from '@mantine/core';
import { IconHeart, IconShoppingCart, IconMinus, IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import classes from './ProductPage.module.css';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { getValidToken, isValidToken, logout } from '../authService';

export default function ProductPageContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['userId', 'token']);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

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
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (searchParams) {
      const productParam = searchParams.get('product');
      if (productParam) {
        try {
          const decodedProduct = JSON.parse(decodeURIComponent(productParam));
          setProduct(decodedProduct);
          
          // Set initial selections
          if (decodedProduct.variants && decodedProduct.variants.length > 0) {
            setSelectedColor(decodedProduct.variants[0].color);
            setSelectedSize(decodedProduct.variants[0].size);
          }
          
          // Set active image
          if (decodedProduct.imageUrl) {
            if (decodedProduct.imageUrl.startsWith('/home/orion')) {
              setActiveImage(`https://fashion-api.addispages.com/api/v1/file/${decodedProduct.imageUrl.split('_uploads/')[1]}`);
            } else {
              setActiveImage(decodedProduct.imageUrl);
            }
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error parsing product data:', error);
          setLoading(false);
        }
      }
    }
  }, [searchParams]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product) return;
    
    const token = await getValidToken();
    
    if (!token) {
      router.push('/login');
      return;
    }

    // Find the selected variant
    const selectedVariant = product.variants.find(v => 
      v.color === selectedColor && v.size === selectedSize
    );

    if (!selectedVariant) {
      alert('Please select both color and size');
      return;
    }

    try {
      const response = await fetch('https://fashion-api.addispages.com/api/v1/orderItem', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          quantity: quantity,
          price: product.price,
          productId: product.productId,
          variantId: selectedVariant.variantId,
          userId: cookies.userId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();
      console.log('dataaa', data);
      alert(`${quantity} ${product.name} (${selectedSize}/${selectedColor}) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container size="xl" py={40}>
        <Text ta="center">Loading product...</Text>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container size="xl" py={40}>
        <Text ta="center">Product not found</Text>
      </Container>
    );
  }

  // Extract unique colors and sizes from variants
  const colors = [...new Set(product.variants ? product.variants.map(v => v.color) : [])];
  const sizes = [...new Set(product.variants ? product.variants.map(v => v.size) : [])];

  return (
    <Container size="xl" py={40} className={classes.root}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        {/* Product Images */}
        <div>
          <div className={classes.mainImageContainer}>
            <Image 
              src={activeImage} 
              alt={product.name} 
              className={classes.mainImage}
              radius="md"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Stack gap="sm">
            <Title order={1} className={classes.productTitle}>
              {product.name}
            </Title>
            
            <Group gap="xs">
              <Badge variant="light" color="teal">{product.categoryId || 'Uncategorized'}</Badge>
              <Badge variant="light" color={product.stockQuantity > 0 ? 'blue' : 'red'}>
                {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </Badge>
            </Group>

            <Title order={2}>${product.price ? product.price.toFixed(2) : '0.00'}</Title>

            <Text mt="sm" className={classes.productDescription}>
              {product.description || 'No description available'}
            </Text>

            <Divider my="md" />

            {/* Color Selection */}
            {colors.length > 0 && (
              <div>
                <Text fw={500} mb="xs">Color: {selectedColor}</Text>
                <Group gap="sm">
                  {colors.map(color => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'filled' : 'outline'}
                      onClick={() => setSelectedColor(color)}
                      className={classes.colorButton}
                    >
                      {color}
                    </Button>
                  ))}
                </Group>
              </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <Text fw={500} mb="xs">Size: {selectedSize}</Text>
                <Group gap="sm">
                  {sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'filled' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className={classes.sizeButton}
                    >
                      {size}
                    </Button>
                  ))}
                </Group>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <Text fw={500} mb="xs">Quantity</Text>
              <Group gap={0}>
                <ActionIcon 
                  variant="default" 
                  size="xl" 
                  radius="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <IconMinus size={16} />
                </ActionIcon>
                <NumberInput
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  min={1}
                  max={product.stockQuantity}
                  hideControls
                  className={classes.quantityInput}
                />
                <ActionIcon 
                  variant="default" 
                  size="xl" 
                  radius="sm"
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                >
                  <IconPlus size={16} />
                </ActionIcon>
              </Group>
            </div>

            {/* Action Buttons */}
            <Group mt="xl" grow>
              <Button
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                leftSection={<IconShoppingCart size={20} />}
                onClick={handleAddToCart}
                disabled={product.stockQuantity <= 0}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                radius="xl"
                variant={isWishlisted ? 'filled' : 'outline'}
                color={isWishlisted ? 'red' : 'gray'}
                leftSection={<IconHeart size={20} fill={isWishlisted ? 'white' : 'none'} />}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </Group>
          </Stack>
        </div>
      </SimpleGrid>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" mt={50}>
        <Tabs.List>
          <Tabs.Tab value="details">Product Details</Tabs.Tab>
          <Tabs.Tab value="shipping">Shipping & Returns</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details" pt="xl">
          <Title order={3} mb="md">About this item</Title>
          <Text>{product.description || 'No additional details available'}</Text>
        </Tabs.Panel>

        <Tabs.Panel value="shipping" pt="xl">
          <Title order={3} mb="md">Shipping Information</Title>
          <Text mb="sm">• Free shipping on orders over $100</Text>
          <Text mb="sm">• Estimated delivery: 3-5 business days</Text>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}