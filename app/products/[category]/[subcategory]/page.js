"use client";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Badge,
  Group,
  Stack,
  Button,
  Divider,
  Center,
  rem
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft, IconShoppingCart } from '@tabler/icons-react';
import classes from './ProductCategory.module.css';

// Mock data for products - in a real app, you'd fetch this based on the category/subcategory
const getProducts = (category, subcategory) => {
  // This would normally come from your database/API
  const allProducts = {
    "tops": {
      "mens-hoodies": [
        {
          id: 1,
          name: "Premium Cotton Hoodie",
          price: 49.99,
          image: "https://lsco.scene7.com/is/image/lsco/A84350019-dynamic1-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=2500",
          colors: ["Black", "Navy", "Gray"],
          sizes: ["S", "M", "L", "XL"],
          rating: 4.8,
          reviews: 124,
          description: "Soft cotton hoodie with kangaroo pocket and adjustable drawstring hood."
        },
        // More hoodies...
      ],
      // Other subcategories...
    },
    // Other categories...
  };

  return allProducts[category]?.[subcategory] || [
    {
      id: 1,
      name: "Classic " + subcategory.replace('-', ' '),
      price: 39.99,
      image: "https://image.hm.com/assets/hm/4e/ed/4eed5c1a69191639372a69e3344eb154dbd59259.jpg?imwidth=2160",
      colors: ["Black", "White", "Blue"],
      sizes: ["S", "M", "L"],
      rating: 4.5,
      reviews: 89,
      description: "High-quality " + subcategory.replace('-', ' ') + " for everyday wear."
    },
    {
        id: 2,
        name: "Classic " + subcategory.replace('-', ' '),
        price: 39.99,
        image: "https://www.pinqponq.com/cdn/shop/files/PPC-HOO-001-30187-pinqponq-Hoodie-Unisex-Pool-Blue-51_1500x.jpg?v=1706795440",
        colors: ["Black", "White", "Blue"],
        sizes: ["S", "M", "L"],
        rating: 4.5,
        reviews: 89,
        description: "High-quality " + subcategory.replace('-', ' ') + " for everyday wear."
      },
    // Add more default products...
  ];
};

export default function ProductCategoryPage({ params }) {
  const { category, subcategory } = params;
  const products = getProducts(category, subcategory);
  const formattedSubcategory = subcategory.replace(/-/g, ' ').replace("mens ", "Men's ").replace("womens ", "Women's ");

  return (
    <Container size="xl" py={40}>
      <Title order={1} mb="xl" className={classes.title}>
        {formattedSubcategory}
      </Title>

      {/* Featured Products Carousel */}
      <Paper withBorder radius="md" p="md" mb="xl">
        <Title order={3} mb="md">Featured Products</Title>
        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
          slideGap={{ base: 0, sm: 'md' }}
          align="start"
          slidesToScroll={1}
          nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
          previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
        >
          {products.slice(0, 5).map((product) => (
            <Carousel.Slide key={product.id}>
              <Paper p="md" className={classes.productCard}>
                <div className={classes.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={classes.productImage}
                  />
                  <Badge color="red" variant="filled" className={classes.saleBadge}>
                    New
                  </Badge>
                </div>
                <Text fw={500} mt="sm" className={classes.productName}>
                  {product.name}
                </Text>
                <Group justify="space-between" mt="xs">
                  <Text fw={700}>{product.price.toFixed(2)} ETB</Text>
                  <Badge color="teal" variant="light">
                    {product.rating} ★ ({product.reviews})
                  </Badge>
                </Group>
                <Button 
                  variant="outline" 
                  fullWidth 
                  mt="md" 
                  rightSection={<IconShoppingCart size={16} />}
                >
                  Add to Cart
                </Button>
              </Paper>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Paper>

      {/* All Products Grid */}
      <Title order={3} mb="md">All {formattedSubcategory}</Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="xl"
        verticalSpacing="xl"
      >
        {products.map((product) => (
          <Paper key={product.id} p="md" radius="md" withBorder className={classes.productCard}>
            <div className={classes.productImageContainer}>
              <img 
                src={product.image} 
                alt={product.name} 
                className={classes.productImage}
              />
              <Badge color="red" variant="filled" className={classes.saleBadge}>
                Sale
              </Badge>
            </div>
            <Text fw={500} mt="sm" className={classes.productName}>
              {product.name}
            </Text>
            <Text c="dimmed" size="sm" lineClamp={2} mt="xs">
              {product.description}
            </Text>
            <Group justify="space-between" mt="xs">
              <Text fw={700}>{product.price.toFixed(2)} ETB</Text>
              <Badge color="teal" variant="light">
                {product.rating} ★
              </Badge>
            </Group>
            <Group gap="xs" mt="xs">
              {product.colors.map((color) => (
                <Badge key={color} variant="outline">
                  {color}
                </Badge>
              ))}
            </Group>
            <Button 
              variant="light" 
              fullWidth 
              mt="md" 
              rightSection={<IconShoppingCart size={16} />}
            >
              Add to Cart
            </Button>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Category Description Section */}
      <Paper withBorder radius="md" p="xl" mt="xl">
        <Title order={3} mb="md">About Our {formattedSubcategory}</Title>
        <Text>
          Discover our premium collection of {formattedSubcategory.toLowerCase()}. Each piece is 
          crafted with attention to detail using high-quality materials for maximum comfort and style. 
          Whether you're looking for casual everyday wear or something more sophisticated, our 
          {formattedSubcategory.toLowerCase()} collection has something for every occasion.
        </Text>
        <Divider my="md" />
        <Group justify="space-between">
          <Text fw={500}>Why choose our {formattedSubcategory.toLowerCase()}?</Text>
          <Button variant="outline" radius="xl">
            Learn More
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}