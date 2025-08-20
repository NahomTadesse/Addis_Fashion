"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, SimpleGrid, Image } from "@mantine/core";

const PRIMARY_COL_HEIGHT = '400px';
const SECONDARY_COL_HEIGHT = '200px';

export default function HomeGrid() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fashion-api.addispages.com/api/v1/products/new-arrivals", {
          headers: { accept: "*/*" },
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchProducts();
  }, []);

  const getImageUrl = (path) => {
    const fileName = path.split("uploads/")[1];
    return `https://fashion-api.addispages.com/api/v1/file/${fileName}`;
  };

  const handleClick = (product) => {
    router.push(`/productPage?data=${encodeURIComponent(JSON.stringify(product))}`);
  };

  if (products.length === 0) return null;

  const [primary, ...rest] = products;

  return (
    <Container fluid my="lg" px={0}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Image
          src={getImageUrl(primary.imageUrl)}
          height={PRIMARY_COL_HEIGHT}
          radius="md"
          alt={primary.name}
          style={{ objectFit: "cover", width: "100%", cursor: "pointer" }}
          onClick={() => handleClick(primary)}
        />
        <SimpleGrid cols={2} spacing="md">
          {rest.slice(0, 4).map((item) => (
            <Image
              key={item.productId}
              src={getImageUrl(item.imageUrl)}
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              alt={item.name}
              style={{ objectFit: "cover", width: "100%", cursor: "pointer" }}
              onClick={() => handleClick(item)}
            />
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}
