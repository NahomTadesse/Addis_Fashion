// 'use client';
// import { Title, Text, SimpleGrid, Container, rem, Badge, Button, Group, Stack, Divider, Select } from '@mantine/core';
// import { Carousel } from '@mantine/carousel';
// import { IconShoppingBag, IconHeart, IconStarFilled } from '@tabler/icons-react';
// import classes from './Collection.module.css';
// import React,{useState} from 'react';
// const genderData = {
//   men: {
//     title: "Men's Collection",
//     description: "Discover the latest trends in men's fashion",
//     featured: [
//       {
//         id: 1,
//         title: "Premium Denim Jacket",
//         price: 89.99,
//         image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
//         colors: ['Black', 'Blue', 'Gray'],
//         rating: 4.8,
//         category: "Jackets"
//       },
//       // Add more featured items...
//     ],
//     categories: [
//       { name: "T-Shirts", count: 42 },
//       { name: "Jeans", count: 36 },
//       { name: "Jackets", count: 28 },
//       { name: "Shoes", count: 45 },
//       { name: "Accessories", count: 23 },
//     ]
//   },
//   women: {
//     title: "Women's Collection",
//     description: "Explore our stunning women's fashion lineup",
//     featured: [
//       {
//         id: 1,
//         title: "Elegant Summer Dress",
//         price: 79.99,
//         image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=734&q=80",
//         colors: ['Red', 'White', 'Blue'],
//         rating: 4.9,
//         category: "Dresses"
//       },
//       // Add more featured items...
//     ],
//     categories: [
//       { name: "Dresses", count: 58 },
//       { name: "Tops", count: 47 },
//       { name: "Jeans", count: 39 },
//       { name: "Shoes", count: 52 },
//       { name: "Accessories", count: 41 },
//     ]
//   }
// };

// export default function CollectionPage({ params }) {
//   const { gender } = params;
//   const data = genderData[gender] || genderData.men;
//   const [sortBy, setSortBy] = useState('featured');

//   return (
//     <div className={classes.root}>
//       {/* Hero Section */}
//       <div className={classes.hero} style={{ 
//         backgroundImage: gender === 'men' 
//           ? 'linear-gradient(rgba(0, 0, 0, 0.5), url(https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)'
//           : 'linear-gradient(rgba(0, 0, 0, 0.5), url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)'
//       }}>
//         <Container size="xl">
//           <Stack align="center" justify="center" h="100%">
//             <Title className={classes.heroTitle}>{data.title}</Title>
//             <Text className={classes.heroDescription}>{data.description}</Text>
//             <Button 
//               size="xl" 
//               radius="xl" 
//               variant="white"
//               className={classes.heroButton}
//               rightSection={<IconShoppingBag size={20} />}
//             >
//               Shop Now
//             </Button>
//           </Stack>
//         </Container>
//       </div>

//       {/* Main Content */}
//       <Container size="xl" py={60}>
//         {/* Categories Section */}
//         <Title order={2} mb="xl" className={classes.sectionTitle}>Shop by Category</Title>
//         <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="lg">
//           {data.categories.map((category) => (
//             <div key={category.name} className={classes.categoryCard}>
//               <div className={classes.categoryImage}></div>
//               <Text fw={600} mt="sm">{category.name}</Text>
//               <Text c="dimmed" size="sm">{category.count} items</Text>
//             </div>
//           ))}
//         </SimpleGrid>

//         {/* Featured Products */}
//         <Group justify="space-between" mt={60} mb="xl">
//           <Title order={2} className={classes.sectionTitle}>Featured Products</Title>
//           <Select
//             placeholder="Sort by"
//             data={[
//               { value: 'featured', label: 'Featured' },
//               { value: 'newest', label: 'Newest' },
//               { value: 'price-high', label: 'Price: High to Low' },
//               { value: 'price-low', label: 'Price: Low to High' },
//             ]}
//             value={sortBy}
//             onChange={setSortBy}
//             className={classes.sortSelect}
//           />
//         </Group>

//         <Carousel
//           slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
//           slideGap="lg"
//           align="start"
//           dragFree
//           withControls={false}
//           classNames={{ slide: classes.carouselSlide }}
//         >
//           {data.featured.map((product) => (
//             <Carousel.Slide key={product.id}>
//               <div className={classes.productCard}>
//                 <div className={classes.productImage} style={{ backgroundImage: `url(${product.image})` }}>
//                   <Badge color="red" variant="filled" className={classes.badge}>New</Badge>
//                   <Button variant="light" radius="xl" className={classes.wishlistButton}>
//                     <IconHeart size={20} />
//                   </Button>
//                 </div>
//                 <Stack gap={4} mt="md">
//                   <Text c="dimmed">{product.category}</Text>
//                   <Text fw={600} size="lg">{product.title}</Text>
//                   <Group>
//                     {product.colors.map(color => (
//                       <Badge key={color} variant="outline">{color}</Badge>
//                     ))}
//                   </Group>
//                   <Group justify="space-between" mt="sm">
//                     <Text fw={700} size="xl">{product.price} ETB</Text>
//                     <Group gap={4}>
//                       <IconStarFilled size={16} color="var(--mantine-color-yellow-6)" />
//                       <Text>{product.rating}</Text>
//                     </Group>
//                   </Group>
//                   <Button 
//                     fullWidth 
//                     mt="sm" 
//                     radius="xl" 
//                     rightSection={<IconShoppingBag size={18} />}
//                     className={classes.addToCart}
//                   >
//                     Add to Cart
//                   </Button>
//                 </Stack>
//               </div>
//             </Carousel.Slide>
//           ))}
//         </Carousel>

//         {/* More content sections can be added here */}
//       </Container>
//     </div>
//   );
// }

'use client';
import { Title, Text, SimpleGrid, Container, Badge, Button, Group, Stack, Divider, Select } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconShoppingBag, IconHeart, IconStarFilled } from '@tabler/icons-react';
import classes from './Collection.module.css';
import React, { useState, useEffect } from 'react';

const genderData = {
  men: {
    title: "Men's Collection",
    description: "Discover the latest trends in men's fashion",
    featured: [
      {
        id: 1,
        title: "Premium Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        colors: ['Black', 'Blue', 'Gray'],
        rating: 4.8,
        category: "Jackets"
      },
    ],
    categories: [
      { name: "T-Shirts", count: 42 },
      { name: "Jeans", count: 36 },
      { name: "Jackets", count: 28 },
      { name: "Shoes", count: 45 },
      { name: "Accessories", count: 23 },
    ]
  },
  women: {
    title: "Women's Collection",
    description: "Explore our stunning women's fashion lineup",
    featured: [
      {
        id: 1,
        title: "Elegant Summer Dress",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=734&q=80",
        colors: ['Red', 'White', 'Blue'],
        rating: 4.9,
        category: "Dresses"
      },
    ],
    categories: [
      { name: "Dresses", count: 58 },
      { name: "Tops", count: 47 },
      { name: "Jeans", count: 39 },
      { name: "Shoes", count: 52 },
      { name: "Accessories", count: 41 },
    ]
  }
};

export default function CollectionPage({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        // params is a Promise, so we need to await it
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (error) {
        console.error('Error resolving params:', error);
      } finally {
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  // Better background images for men and women
  const heroBackgrounds = {
    men: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)',
    women: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1536678891919-e0e7d61a4b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80)'
  };

  if (loading) {
    return (
      <Container size="xl" py={60}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text>Loading collection...</Text>
        </div>
      </Container>
    );
  }

  const gender = resolvedParams?.gender || 'men';
  const data = genderData[gender] || genderData.men;

  return (
    <div className={classes.root}>
      {/* Hero Section with improved background */}
      <div 
        className={classes.hero} 
        style={{ 
          backgroundImage: heroBackgrounds[gender] || heroBackgrounds.men,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        }}
      >
        <Container size="xl">
          <Stack align="center" justify="center" h="100%">
            <Title className={classes.heroTitle} style={{ color: 'white' }}>
              {data.title}
            </Title>
            <Text className={classes.heroDescription} style={{ color: 'white' }}>
              {data.description}
            </Text>
            <Button 
              size="xl" 
              radius="xl" 
              variant="white"
              className={classes.heroButton}
              rightSection={<IconShoppingBag size={20} />}
            >
              Shop Now
            </Button>
          </Stack>
        </Container>
      </div>

      {/* Main Content */}
      <Container size="xl" py={60}>
        {/* Categories Section */}
        <Title order={2} mb="xl" className={classes.sectionTitle}>Shop by Category</Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="lg">
          {data.categories.map((category) => (
            <div key={category.name} className={classes.categoryCard}>
              <div className={classes.categoryImage}></div>
              <Text fw={600} mt="sm">{category.name}</Text>
              <Text c="dimmed" size="sm">{category.count} items</Text>
            </div>
          ))}
        </SimpleGrid>

        {/* Featured Products */}
        <Group justify="space-between" mt={60} mb="xl">
          <Title order={2} className={classes.sectionTitle}>Featured Products</Title>
          <Select
            placeholder="Sort by"
            data={[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'price-low', label: 'Price: Low to High' },
            ]}
            value={sortBy}
            onChange={setSortBy}
            className={classes.sortSelect}
          />
        </Group>

        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
          slideGap="lg"
          align="start"
          dragFree
          withControls={false}
          classNames={{ slide: classes.carouselSlide }}
        >
          {data.featured.map((product) => (
            <Carousel.Slide key={product.id}>
              <div className={classes.productCard}>
                <div className={classes.productImage} style={{ backgroundImage: `url(${product.image})` }}>
                  <Badge color="red" variant="filled" className={classes.badge}>New</Badge>
                  <Button variant="light" radius="xl" className={classes.wishlistButton}>
                    <IconHeart size={20} />
                  </Button>
                </div>
                <Stack gap={4} mt="md">
                  <Text c="dimmed">{product.category}</Text>
                  <Text fw={600} size="lg">{product.title}</Text>
                  <Group>
                    {product.colors.map(color => (
                      <Badge key={color} variant="outline">{color}</Badge>
                    ))}
                  </Group>
                  <Group justify="space-between" mt="sm">
                    <Text fw={700} size="xl">{product.price} ETB</Text>
                    <Group gap={4}>
                      <IconStarFilled size={16} color="var(--mantine-color-yellow-6)" />
                      <Text>{product.rating}</Text>
                    </Group>
                  </Group>
                  <Button 
                    fullWidth 
                    mt="sm" 
                    radius="xl" 
                    rightSection={<IconShoppingBag size={18} />}
                    className={classes.addToCart}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}