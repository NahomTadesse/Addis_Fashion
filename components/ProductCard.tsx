// components/ProductCard.tsx
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export function ProductCard({ product }: { product: any }) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={product.image}
                    height={300}
                    alt={product.name}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{product.name}</Text>
                {product.isNew && <Badge color="pink">New</Badge>}
            </Group>

            <Text c="dimmed" size="sm">
                ${product.price.toFixed(2)}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Add to cart
            </Button>
        </Card>
    );
}