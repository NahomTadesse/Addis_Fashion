

// "use client"
// import { 
//     Container, 
//     Title, 
//     SimpleGrid, 
//     Card, 
//     Image, 
//     Text, 
//     Badge,
//     Loader,
//     Center,
//     AspectRatio,
//     Group,
//     rem,
//     Button
  
// } from '@mantine/core';
// import classes from './CollectionPage.module.css';
// import { useEffect, useState } from 'react';
// import { Carousel } from '@mantine/carousel'
// import { useRouter } from 'next/navigation';
// import { IconArrowRight, IconArrowLeft, IconShoppingCart } from '@tabler/icons-react';
// import { use } from 'react';

// const fetchProducts = async (endpoint: string) => {
//     try {
//         const response = await fetch(`https://fashion-api.addispages.com/api/v1/products/popular`, {
//             headers: { accept: '*/*' },
//             cache: 'force-cache'
//         });
//         if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// };

// const formatImageUrl = (url: string) => {
//     if (!url) return 'https://placehold.co/400?text=No+Image';
//     if (url.startsWith('/home/orion')) {
//         return `https://fashion-api.addispages.com/api/v1/file/${url.split('_uploads/')[1]}`;
//     }
//     return url;
// };

// export default function CollectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
//     const { collectionId } = use(params);
//     const [products, setProducts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
    
//     const collectionData = {
//         'trending-styles': {
//             title: "Trending Styles",
//             description: "Discover the hottest fashion trends this season",
//             endpoint: "trending"
//         },
//         'exclusive-deals': {
//             title: "Exclusive Deals",
//             description: "Special offers and discounts just for you",
//             endpoint: "discounted"
//         },
//         'fashion-guides': {
//             title: "Fashion Guides",
//             description: "Curated collections to inspire your style",
//             endpoint: "popular"
//         }
//     };

//     useEffect(() => {
//         const loadProducts = async () => {
//             try {
//                 const endpoint = collectionData[collectionId]?.endpoint || 'popular';
//                 const data = await fetchProducts(endpoint);
//                 setProducts(Array.isArray(data) ? data : []);
//             } catch (error) {
//                 console.error('Error loading products:', error);
//                 setProducts([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         loadProducts();
//     }, [collectionId]);

//     const navigateToProduct = (product: any) => {
//         // Modified to match what your product page expects
//         router.push(`/productPage?product=${encodeURIComponent(JSON.stringify(product))}`);
//     };

//     if (loading) {
//         return (
//             <Container size="xl" py={40}>
//                 <Center style={{ height: '200px' }}>
//                     <Loader size="xl" />
//                 </Center>
//             </Container>
//         );
//     }

//     return (
//         <Container size="xl" py={20} className={classes.container}>
//             {/* Collection Header */}
//             <div className={classes.header}>
//                 <Title order={1} className={classes.collectionTitle}>
//                     {collectionData[collectionId]?.title || "Collection"}
//                 </Title>
//                 <Text c="dimmed" className={classes.collectionDescription}>
//                     {collectionData[collectionId]?.description || "Discover our curated selection"}
//                 </Text>
//             </div>
            
//             {/* Compact Featured Products Carousel */}
//             {products.length > 0 && (
//                 <>
//                     <Title order={2} mt={40} mb="md">Featured Products</Title>
//                     <Carousel
//                         slideSize={{ base: '100%', sm: '50%', md: '33.333%', lg: '25%' }}
//                         slideGap="md"
//                         align="start"
//                         slidesToScroll={1}
//                         height={300}
//                         nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
//                         previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
//                         mb={40}
//                         withIndicators
//                     >
//                         {products.slice(0, 8).map((product) => (
//                             <Carousel.Slide key={product.productId}>
//                                 <Card 
//                                     shadow="sm" 
//                                     padding="md" 
//                                     radius="md" 
//                                     withBorder
//                                     style={{ height: '100%' }}
//                                     onClick={() => navigateToProduct(product)}
//                                 >
//                                     <Card.Section>
//                                         <AspectRatio ratio={1}>
//                                             <Image
//                                                 src={formatImageUrl(product.imageUrl)}
//                                                 alt={product.name}
//                                                 fit="cover"
//                                             />
//                                         </AspectRatio>
//                                     </Card.Section>
//                                     <Group justify="space-between" mt="md" mb="xs">
//                                         <Text fw={500} lineClamp={1}>{product.name}</Text>
//                                         {product.isNew && <Badge color="blue">New</Badge>}
//                                     </Group>
//                                     <Text fw={700} c="blue">
//                                         ${product.price.toFixed(2)}
//                                     </Text>
//                                     <Button 
//                                         variant="light" 
//                                         fullWidth 
//                                         mt="md" 
//                                         radius="md"
//                                         rightSection={<IconShoppingCart size={16} />}
//                                     >
//                                         Add to cart
//                                     </Button>
//                                 </Card>
//                             </Carousel.Slide>
//                         ))}
//                     </Carousel>
//                 </>
//             )}

//             {/* All Products Grid */}
//             <Title order={2} mb="md">All Products</Title>
//             <SimpleGrid 
//                 cols={{ base: 2, sm: 3, md: 4, lg: 5 }} 
//                 spacing="md"
//                 verticalSpacing="md"
//             >
//                 {products.map((product) => (
//                     <Card 
//                         key={product.productId} 
//                         shadow="sm" 
//                         padding="lg" 
//                         radius="md" 
//                         withBorder
//                         onClick={() => navigateToProduct(product)}
//                         style={{ cursor: 'pointer' }}
//                     >
//                         <Card.Section>
//                             <AspectRatio ratio={1}>
//                                 <Image
//                                     src={formatImageUrl(product.imageUrl)}
//                                     alt={product.name}
//                                     fit="cover"
//                                 />
//                             </AspectRatio>
//                         </Card.Section>
//                         <Group justify="space-between" mt="md" mb="xs">
//                             <Text fw={500} lineClamp={1}>{product.name}</Text>
//                             {product.isNew && <Badge color="blue">New</Badge>}
//                         </Group>
//                         <Text fw={700} c="blue">
//                             ${product.price.toFixed(2)}
//                         </Text>
//                     </Card>
//                 ))}
//             </SimpleGrid>

//             {products.length === 0 && !loading && (
//                 <Center py={40}>
//                     <Text c="dimmed">No products found in this collection</Text>
//                 </Center>
//             )}
//         </Container>
//     );
// }


"use client";
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Loader,
  Center,
  AspectRatio,
  Group,
  rem,
  Button,
} from '@mantine/core';
import classes from './CollectionPage.module.css';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { useRouter } from 'next/navigation';
import { IconArrowRight, IconArrowLeft, IconShoppingCart } from '@tabler/icons-react';

// Define interfaces for type safety
interface Collection {
  title: string;
  description: string;
  endpoint: string;
}

// Define valid collection IDs
type CollectionId = 'trending-styles' | 'exclusive-deals' | 'fashion-guides';

// Define collectionData type
interface CollectionData {
  [key in CollectionId]: Collection;
}

// Product interface (adjust based on your API response)
interface Product {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  isNew?: boolean;
}

// Define collectionData
const collectionData: CollectionData = {
  'trending-styles': {
    title: 'Trending Styles',
    description: 'Discover the hottest fashion trends this season',
    endpoint: 'trending',
  },
  'exclusive-deals': {
    title: 'Exclusive Deals',
    description: 'Special offers and discounts just for you',
    endpoint: 'discounted',
  },
  'fashion-guides': {
    title: 'Fashion Guides',
    description: 'Curated collections to inspire your style',
    endpoint: 'popular',
  },
};

const fetchProducts = async (endpoint: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://fashion-api.addispages.com/api/v1/products/${endpoint}`, {
      headers: { accept: '*/*' },
      cache: 'force-cache',
    });
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const formatImageUrl = (url: string): string => {
  if (!url) return 'https://placehold.co/400?text=No+Image';
  if (url.startsWith('/home/orion')) {
    return `https://fashion-api.addispages.com/api/v1/file/${url.split('_uploads/')[1]}`;
  }
  return url;
};

interface CollectionPageProps {
  params: { collectionId: CollectionId };
}

export default function CollectionPage({ params }: { params: Promise<CollectionPageProps['params']> }) {
  const { collectionId } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Validate collectionId
        if (!(collectionId in collectionData)) {
          console.error(`Invalid collection ID: ${collectionId}`);
          setProducts([]);
          setLoading(false);
          return;
        }
        const endpoint = collectionData[collectionId].endpoint;
        const data = await fetchProducts(endpoint);
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [collectionId]);

  const navigateToProduct = (product: Product) => {
    router.push(`/productPage?product=${encodeURIComponent(JSON.stringify(product))}`);
  };

  if (loading) {
    return (
      <Container size="xl" py={40}>
        <Center style={{ height: '200px' }}>
          <Loader size="xl" />
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py={20} className={classes.container}>
      {/* Collection Header */}
      <div className={classes.header}>
        <Title order={1} className={classes.collectionTitle}>
          {collectionData[collectionId]?.title || 'Collection'}
        </Title>
        <Text c="dimmed" className={classes.collectionDescription}>
          {collectionData[collectionId]?.description || 'Discover our curated selection'}
        </Text>
      </div>

      {/* Compact Featured Products Carousel */}
      {products.length > 0 && (
        <>
          <Title order={2} mt={40} mb="md">
            Featured Products
          </Title>
          <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '33.333%', lg: '25%' }}
            slideGap="md"
            align="start"
            slidesToScroll={1}
            height={300}
            nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
            previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
            mb={40}
            withIndicators
          >
            {products.slice(0, 8).map((product) => (
              <Carousel.Slide key={product.productId}>
                <Card
                  shadow="sm"
                  padding="md"
                  radius="md"
                  withBorder
                  style={{ height: '100%' }}
                  onClick={() => navigateToProduct(product)}
                >
                  <Card.Section>
                    <AspectRatio ratio={1}>
                      <Image src={formatImageUrl(product.imageUrl)} alt={product.name} fit="cover" />
                    </AspectRatio>
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} lineClamp={1}>
                      {product.name}
                    </Text>
                    {product.isNew && <Badge color="blue">New</Badge>}
                  </Group>
                  <Text fw={700} c="blue">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Button
                    variant="light"
                    fullWidth
                    mt="md"
                    radius="md"
                    rightSection={<IconShoppingCart size={16} />}
                  >
                    Add to cart
                  </Button>
                </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
        </>
      )}

      {/* All Products Grid */}
      <Title order={2} mb="md">
        All Products
      </Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md" verticalSpacing="md">
        {products.map((product) => (
          <Card
            key={product.productId}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => navigateToProduct(product)}
            style={{ cursor: 'pointer' }}
          >
            <Card.Section>
              <AspectRatio ratio={1}>
                <Image src={formatImageUrl(product.imageUrl)} alt={product.name} fit="cover" />
              </AspectRatio>
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500} lineClamp={1}>
                {product.name}
              </Text>
              {product.isNew && <Badge color="blue">New</Badge>}
            </Group>
            <Text fw={700} c="blue">
              ${product.price.toFixed(2)}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      {products.length === 0 && !loading && (
        <Center py={40}>
          <Text c="dimmed">No products found in this collection</Text>
        </Center>
      )}
    </Container>
  );
}