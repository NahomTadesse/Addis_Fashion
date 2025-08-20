// "use client"
// import { 
//     Container, 
//     Title, 
//     SimpleGrid, 
//     Card, 
//     Image, 
//     Text, 
//     Badge, 
//     Button, 
//     Group 
// } from '@mantine/core';
// import { Carousel } from '@mantine/carousel';
// import classes from './CollectionPage.module.css';

// // Define collectionsData here (should match your header component)
// const collectionsData = [
//     {
//         id: 'trending-styles',
//         title: 'Trending Styles',
//         description: 'Discover the latest fashion trends and styles',
//     },
//     {
//         id: 'exclusive-deals',
//         title: 'Exclusive Deals',
//         description: 'Get access to exclusive fashion deals and discounts',
//     },
//     {
//         id: 'fashion-guides',
//         title: 'Fashion Guides',
//         description: 'Learn how to style your outfits like a pro',
//     },
//     // Add other collections as needed
// ];

// // Sample product data for each collection
// const collectionProducts = {
//     'trending-styles': [
//         {
//             id: 1,
//             name: 'Summer Floral Dress',
//             price: 49.99,
//             image: 'https://t3.ftcdn.net/jpg/02/72/64/12/360_F_272641294_ooG94oz5pf2JgZUe57AK9f81naHbbPkG.jpg',
//             category: 'Dresses',
//             isNew: true
//         },
//         {
//             id: 2,
//             name: 'Denim Jacket',
//             price: 79.99,
//             image: 'https://tommy-europe.scene7.com/is/image/TommyEurope/DM0DM20495_1A4_main?$b2c_updp_m_mainImage_1920$',
//             category: 'Jackets',
//             isNew: false
//         },
//     ],
//     'exclusive-deals': [
//         {
//             id: 3,
//             name: 'Designer Handbag',
//             price: 199.99,
//             image: 'https://m.media-amazon.com/images/I/71JqxwvBbjL._AC_SL1500_.jpg',
//             category: 'Accessories',
//             isNew: true
//         },
//     ],
//     'fashion-guides': [
//         {
//             id: 4,
//             name: 'Style Guide Book',
//             price: 24.99,
//             image: 'https://i.pinimg.com/736x/36/e0/08/36e00857497b6e740cd8d50ac5467aae.jpg',
//             category: 'Books',
//             isNew: false
//         },
//     ],
// };

// // Sample categories for the carousel
// const categories = [
//     {
//         id: 1,
//         name: 'Dresses',
//         image: 'https://cdn-img.prettylittlething.com/6/0/5/c/605cd0b2cbef30967526bc9c2ada92ff25af1c7e_cmu6186_1.jpg'
//     },
//     {
//         id: 2,
//         name: 'Jackets',
//         image: 'https://m.media-amazon.com/images/I/61ERl8U2SRL._AC_SL1423_.jpg'
//     },
//     {
//         id: 3,
//         name: 'Accessories',
//         image: 'https://ounass-sa.atgcdn.ae/contentful/b3xlytuyfm3e/5eBTEA5YilyV4rXYBf4CfL/6cf7784f92b76f82bd5ed01647b8ef58/Women_Accessories_DSK_PLP_Banner_.jpg?q=70'
//     },
//     {
//         id: 4,
//         name: 'Shoes',
//         image: 'https://i5.walmartimages.com/seo/Damyuan-Running-Shoes-Men-Fashion-Sneakers-Slip-on-Casual-Walking-Shoes-Sport-Athletic-Shoes-Lightweight-Breathable-Comfortable_4114141f-7d26-4dd7-933d-babc24080395.516ad145e1a1d8d82a801ac48231950d.jpeg'
//     },
// ];

// export default function CollectionPage({ params }: { params: { collectionId: string } }) {
//     const products = collectionProducts[params.collectionId] || [];
//     const collectionInfo = collectionsData.find(c => c.id === params.collectionId);
    
//     if (!collectionInfo) {
//         return (
//             <Container size="xl" py={40}>
//                 <Title order={1}>Collection not found</Title>
//                 <Text mt="md">The requested collection does not exist.</Text>
//             </Container>
//         );
//     }

//     return (
//         <Container size="xl" py={40}>
//             <Title order={1} mb={40}>{collectionInfo.title}</Title>
//             <Text mb={40} c="dimmed">{collectionInfo.description}</Text>
            
//             {/* Rest of your component remains the same */}
//             {/* Hero Carousel */}
//             <Carousel withIndicators height={600} mb={40} loop>
//                 {products.slice(0, 5).map((product) => (
//                     <Carousel.Slide key={product.id}>
//                         <div className={classes.heroSlide}>
//                             <Image 
//                                 src={product.image} 
//                                 alt={product.name}
//                                 height={400}
//                                 fit="cover"
//                             />
//                             <div className={classes.heroOverlay}>
//                                 <Title order={2} c="white">{product.name}</Title>
//                                 <Button size="lg" mt="md">Shop Now</Button>
//                             </div>
//                         </div>
//                     </Carousel.Slide>
//                 ))}
//             </Carousel>

//             {/* Product Grid */}
//             <Title order={2} mb={30}>Featured Items</Title>
//             <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
//                 {products.map((product) => (
//                     <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder>
//                         <Card.Section>
//                             <Image
//                                 src={product.image}
//                                 height={300}
//                                 alt={product.name}
//                             />
//                         </Card.Section>

//                         <Group justify="space-between" mt="md" mb="xs">
//                             <Text fw={500}>{product.name}</Text>
//                             {product.isNew && <Badge color="pink">New</Badge>}
//                         </Group>

//                         <Text c="dimmed" size="sm">
//                             ${product.price.toFixed(2)}
//                         </Text>

//                         <Button variant="light" color="blue" fullWidth mt="md" radius="md">
//                             Add to cart
//                         </Button>
//                     </Card>
//                 ))}
//             </SimpleGrid>

//             {/* Category Carousel */}
//             <Title order={2} mt={50} mb={30}>Shop by Category</Title>
//             <Carousel 
//                 slideSize="33.333%"
//                 slideGap="md"
//                 align="start"
//                 slidesToScroll={3}
//             >
//                 {categories.map((category) => (
//                     <Carousel.Slide key={category.id} style={{marginBottom:20}}>
//                         <Card shadow="sm" padding="xl" radius="md">
//                             <Card.Section>
//                                 <Image
//                                     src={category.image}
//                                     height={400}
//                                     alt={category.name}
//                                 />
//                             </Card.Section>
//                             <Text fw={500} size="lg" mt="md">
//                                 {category.name}
//                             </Text>
//                             <Button variant="light" mt="md">
//                                 Shop Now
//                             </Button>
//                         </Card>
//                     </Carousel.Slide>
//                 ))}
//             </Carousel>
//         </Container>
//     );
// }


// import { Carousel } from '@mantine/carousel'

"use client"
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
    Button
  
} from '@mantine/core';
import classes from './CollectionPage.module.css';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel'
import { useRouter } from 'next/navigation';
import { IconArrowRight, IconArrowLeft, IconShoppingCart } from '@tabler/icons-react';
import { use } from 'react';

const fetchProducts = async (endpoint: string) => {
    try {
        const response = await fetch(`https://fashion-api.addispages.com/api/v1/products/popular`, {
            headers: { accept: '*/*' },
            cache: 'force-cache'
        });
        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

const formatImageUrl = (url: string) => {
    if (!url) return 'https://placehold.co/400?text=No+Image';
    if (url.startsWith('/home/orion')) {
        return `https://fashion-api.addispages.com/api/v1/file/${url.split('_uploads/')[1]}`;
    }
    return url;
};

export default function CollectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
    const { collectionId } = use(params);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    const collectionData = {
        'trending-styles': {
            title: "Trending Styles",
            description: "Discover the hottest fashion trends this season",
            endpoint: "trending"
        },
        'exclusive-deals': {
            title: "Exclusive Deals",
            description: "Special offers and discounts just for you",
            endpoint: "discounted"
        },
        'fashion-guides': {
            title: "Fashion Guides",
            description: "Curated collections to inspire your style",
            endpoint: "popular"
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const endpoint = collectionData[collectionId]?.endpoint || 'popular';
                const data = await fetchProducts(endpoint);
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error loading products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadProducts();
    }, [collectionId]);

    const navigateToProduct = (product: any) => {
        // Modified to match what your product page expects
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
                    {collectionData[collectionId]?.title || "Collection"}
                </Title>
                <Text c="dimmed" className={classes.collectionDescription}>
                    {collectionData[collectionId]?.description || "Discover our curated selection"}
                </Text>
            </div>
            
            {/* Compact Featured Products Carousel */}
            {products.length > 0 && (
                <>
                    <Title order={2} mt={40} mb="md">Featured Products</Title>
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
                                            <Image
                                                src={formatImageUrl(product.imageUrl)}
                                                alt={product.name}
                                                fit="cover"
                                            />
                                        </AspectRatio>
                                    </Card.Section>
                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500} lineClamp={1}>{product.name}</Text>
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
            <Title order={2} mb="md">All Products</Title>
            <SimpleGrid 
                cols={{ base: 2, sm: 3, md: 4, lg: 5 }} 
                spacing="md"
                verticalSpacing="md"
            >
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
                                <Image
                                    src={formatImageUrl(product.imageUrl)}
                                    alt={product.name}
                                    fit="cover"
                                />
                            </AspectRatio>
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500} lineClamp={1}>{product.name}</Text>
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