'use client';
import { Button, Container, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import classes from './HeroImageRight.module.css';

export default function HeroImageRight() {
  const router = useRouter();
  const menId = '2929fc87-c875-48c1-9091-3c9b346d1cfe';
  const womenId = '225f4e18-df35-4aa6-854f-1210939f8988';

  const handleCategoryClick = async (gender: 'men' | 'women', categoryId: string) => {
    try {
      const res = await fetch(`https://fashion-api.addispages.com/api/v1/products/category/${categoryId}`, {
        headers: { accept: '*/*' },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch category products');

      // Store data in localStorage (temp workaround) or better, global state
      localStorage.setItem(`${gender}Products`, JSON.stringify(data));

      router.push(`/gender/${gender}`);
    } catch (error) {
      console.error('Category fetch failed:', error);
      alert('Failed to load products. Please try again.');
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.overlay} />
      <div className={classes.animatedBackground} />

      <Container size="lg" className={classes.container}>
        <div className={classes.inner}>
          <motion.div
            className={classes.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title className={classes.title}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Text component="span" className={classes.mainTitle} variant="gradient" gradient={{ from: '#ffffff', to: '#e0e0e0' }}>
                  Addis Fashion
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Text component="span" className={classes.subTitle} variant="gradient" gradient={{ from: '#f5f5f5', to: '#bdbdbd' }}>
                  New Fashion House
                </Text>
              </motion.div>
            </Title>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
              <Text className={classes.description} mt={30}>
                Welcome to Addis Fashion, where fashion meets individuality. Explore our curated collections designed to empower and inspire.
              </Text>
            </motion.div>

            <motion.div
              className={classes.buttonGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                variant="gradient"
                gradient={{ from: '#000000', to: '#434343' }}
                size="xl"
                className={classes.button}
                radius="xl"
                onClick={() => handleCategoryClick('men', menId)}
              >
                Men's Collection
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: '#434343', to: '#000000' }}
                size="xl"
                className={classes.button}
                radius="xl"
                onClick={() => handleCategoryClick('women', womenId)}
              >
                Women's Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
