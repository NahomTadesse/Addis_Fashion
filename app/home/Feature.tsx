import { IconCookie, IconGauge, IconLock, IconMessage2, IconUser } from '@tabler/icons-react';
import { Container, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './FeaturesGrid.module.css';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Latest Fashion Trends',
    description:
      'Stay ahead of the style curve with our curated selection of the latest trends in fashion, ensuring you always look your best.',
  },
  {
    icon: IconUser,
    title: 'Personal Styling',
    description:
      'Our personal stylists are here to help you find the perfect outfits that match your unique style and body type.',
  },
  {
    icon: IconCookie,
    title: 'Quality Materials',
    description:
      'We use only the finest materials in our collections, ensuring that every piece not only looks great but feels great too.',
  },
  {
    icon: IconLock,
    title: 'Sustainable Fashion',
    description:
      'Our commitment to sustainability means that you can look stylish while being eco-friendly and responsible with your choices.',
  },
  {
    icon: IconMessage2,
    title: '24/7 Customer Support',
    description:
      'Our dedicated customer support team is always ready to assist you, whether it’s about sizing, styling tips, or order inquiries.',
  },
  {
    icon: IconMessage2,
    title: '24/7 Customer Support',
    description:
      'Our dedicated customer support team is always ready to assist you, whether it’s about sizing, styling tips, or order inquiries.',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={18} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Explore Our Unique Fashion Features</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Discover how our fashion solutions can elevate your style and lifestyle, combining elegance with comfort.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 150 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}