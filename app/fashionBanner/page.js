'use client'
import { Carousel } from '@mantine/carousel';
import { Button, Title, Text, useMantineTheme, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './FashionBanner.module.css';
import '@mantine/carousel/styles.css';

const fashionSlides = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Summer Collection 2024',
    subtitle: 'Discover the hottest trends this season',
    cta: 'Shop Now',
    colorScheme: 'light',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Men\'s Formal Wear',
    subtitle: 'Elevate your office wardrobe',
    cta: 'Explore',
    colorScheme: 'dark',
  },
  {
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    title: 'Streetwear Essentials',
    subtitle: 'Urban fashion for everyday comfort',
    cta: 'Browse Collection',
    colorScheme: 'light',
  },
  {
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    title: 'Luxury Accessories',
    subtitle: 'Complete your look with premium pieces',
    cta: 'View Items',
    colorScheme: 'dark',
  },
];

function Slide({ image, title, subtitle, cta, colorScheme }) {
  return (
    <div 
      className={classes.slide}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`${classes.content} ${classes[colorScheme]}`}>
        <Title className={classes.title}>{title}</Title>
        <Text className={classes.subtitle}>{subtitle}</Text>
        <Button 
          variant={colorScheme === 'dark' ? 'white' : 'filled'} 
          color={colorScheme === 'dark' ? 'dark' : 'primary'}
          size="lg"
          className={classes.button}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}

export default function FashionBanner() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const slides = fashionSlides.map((slide, index) => (
    <Carousel.Slide key={index}>
      <Slide {...slide} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      loop
      height={mobile ? rem(400) : rem(600)}
      slideGap="md"
      align="start"
      slidesToScroll={1}
      classNames={{
        root: classes.carousel,
        controls: classes.controls,
        indicator: classes.indicator,
      }}
    >
      {slides}
    </Carousel>
  );
}