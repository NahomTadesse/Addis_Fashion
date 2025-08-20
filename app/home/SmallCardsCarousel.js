'use client';
import React, { useEffect } from 'react';
import { Card, Image, Text, Group } from '@mantine/core';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from './SmallCardsCarousel.module.css';
import { useRouter } from 'next/navigation';

const SmallCardsCarousel = ({ data = [] }) => {
  const router = useRouter();
 
  
  console.log('Carousel data:', data[0].imageUrl); // Debugging line

  if (data.length === 0) {
    return (
      <div className={classes.carouselContainer}>
        <Text ta="center" c="dimmed">No products available</Text>
      </div>
    );
  }
useEffect(()=>{
  console.log('lofffff',data)
},[])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCardClick = (product) => {
    router.push(`/productPage?product=${encodeURIComponent(JSON.stringify(product))}`);
  };

  return (
   <div className={classes.carouselContainer} style={{ overflow: 'hidden' }}>
  <Slider {...settings}>
    {data.map((product) => (
      <div key={product.productId} className={classes.cardWrapper}>
        <Card shadow="sm" padding="lg" className={classes.card}>
          <Card.Section>
            <Image
              src={`https://fashion-api.addispages.com/api/v1/file/${product.imageUrl.split('_uploads/')[1]}`}
              height={300}
              alt={product.name}
              onClick={() => handleCardClick(product)}
              style={{ cursor: 'pointer' }}
            />
          </Card.Section>
          <Group position="apart" style={{ marginBottom: 5, marginTop: 10 }}>
            <Text fw={500}>{product.name}</Text>
          </Group>
          <Text size="sm" style={{ color: 'gray' }}>
            ${product.price}
          </Text>
        </Card>
      </div>
    ))}
  </Slider>
</div>
  );
};

export default SmallCardsCarousel;
