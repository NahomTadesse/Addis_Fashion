'use client';
import { useEffect, useState } from 'react';
import { Container, SimpleGrid, Image, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';

const API_BASE = 'https://fashion-api.addispages.com/api/v1';

export default function LeadGrid() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_BASE}/products/new-arrivals`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    const filename = imagePath.split('/dev_fashion_uploads/')[1];
    return `${API_BASE}/file/${filename}`;
  };

  if (products.length === 0) {
    return <Loader size="lg" />;
  }

  const primary = products[0];
  const secondary = products.slice(1, 5);

  return (
    <Container fluid my="lg" px={0}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Image
          src={getImageUrl(primary.imageUrl)}
          height="400px"
          radius="md"
          alt={primary.name}
          style={{ objectFit: 'cover', width: '100%', cursor: 'pointer' }}
          onClick={() => router.push(`/productPage?productId=${primary.productId}`)}
        />
        <SimpleGrid cols={2} spacing="md">
          {secondary.map((product) => (
            <Image
              key={product.productId}
              src={getImageUrl(product.imageUrl)}
              height="200px"
              radius="md"
              alt={product.name}
              style={{ objectFit: 'cover', width: '100%', cursor: 'pointer' }}
              onClick={() => router.push(`/productPage?productId=${product.productId}`)}
            />
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}
