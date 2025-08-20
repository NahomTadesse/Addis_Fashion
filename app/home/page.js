// 'use client';
// import { Button, Container, Text, Title, SimpleGrid } from '@mantine/core';
// import classes from './HeroImageRight.module.css';
// import CardsCarousel from '../homeCard/page';
// import SmallCardsCarousel from './SmallCardsCarousel';
// import classess from './FeaturesGrid.module.css';
// import classesF from './FashionCategories.module.css';
// import HomeGrid from './HomeGrid';
// import Feature from './Feature';
// import FashionBanner from '../fashionBanner/page';
// import HeroImageRight from '../HeroImageRight/page';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const fetchProducts = async (endpoint) => {
//   try {
//     const response = await fetch(`https://fashion-api.addispages.com/api/v1/products/${endpoint}`, {
//       headers: { accept: '*/*' },
//     });
//     if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const fetchSubCategories = async () => {
//   try {
//     const response = await fetch('http://fashion-api.addispages.com/api/v1/categories/subcategory/all', {
//       headers: { accept: '*/*' },
//     });

//     if (!response.ok) throw new Error('Failed to fetch subcategories');
//     const data = await response.json();
//     return data.data;
//   } catch (error) {
//     console.error('Error fetching subcategories:', error);
//     return [];
//   }
// };

// const groupSubCategories = (subCategories, gender) => {
//   const filtered = subCategories.filter(item =>
//     item.categoryName.toLowerCase() === gender.toLowerCase()
//   );

//   const groups = {};
//   filtered.forEach(item => {
//     let categoryName = item.subCategoryName;
//     if (categoryName.includes("'s ")) {
//       categoryName = categoryName.split("'s ")[1];
//     }

//     const groupName = categoryName.split(' ')[0];
//     if (!groups[groupName]) groups[groupName] = [];
//     if (!groups[groupName].includes(item.subCategoryName)) {
//       groups[groupName].push(item.subCategoryName);
//     }
//   });

//   return Object.entries(groups).map(([title, items]) => ({
//     title,
//     items: items.slice(0, 4),
//   }));
// };

// const FashionCategories = ({ gender = 'men' }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadData = async () => {
//       const subCategories = await fetchSubCategories();
//       const grouped = groupSubCategories(subCategories, gender);
//       setCategories(grouped);
//       setLoading(false);
//     };

//     loadData();
//   }, [gender]);

//   const handleCategoryClick = async (categoryTitle, item) => {
//     try {
//       const subCategories = await fetchSubCategories();
//       const matchedSubCategory = subCategories.find(
//         sub =>
//           sub.subCategoryName.toLowerCase() === item.toLowerCase() ||
//           sub.subCategoryName.toLowerCase().includes(item.toLowerCase())
//       );

//       if (matchedSubCategory) {
//         const res = await fetch(`https://fashion-api.addispages.com/api/v1/products/category/${matchedSubCategory.subCategoryId}`, {
//           headers: { accept: '*/*' }
//         });

//         if (res.ok) {
//           const products = await res.json();
//           if (products.length > 0) {
//             const path = `/products/${encodeURIComponent(categoryTitle.toLowerCase().replace(/\s+/g, '-'))}/${encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-').replace("'", ''))}`;
//             router.push(path);
//           } else {
//             alert('No products found for this category.');
//           }
//         }
//       } else {
//         console.warn('Subcategory not found');
//       }
//     } catch (error) {
//       console.error('Error fetching subcategory products:', error);
//     }
//   };

//   const handleGenderClick = async () => {
//     try {
//       const subCategories = await fetchSubCategories();
//       const matched = subCategories.find(
//         sub => sub.categoryName.toLowerCase() === gender.toLowerCase()
//       );

//       if (matched && matched.categoryId) {
//         const res = await fetch(`https://fashion-api.addispages.com/api/v1/products/category/${matched.categoryId}`, {
//           headers: { accept: '*/*' }
//         });

//         if (res.ok) {
//           const products = await res.json();
//           if (products.length > 0) {
//             const path = `/products/${encodeURIComponent(gender.toLowerCase())}`;
//             router.push(path);
//           } else {
//             alert(`No products found for ${gender}`);
//           }
//         }
//       }
//     } catch (err) {
//       console.error('Error fetching gender category products:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <Container size="xl" py={40}>
//         <Text ta="center">Loading categories...</Text>
//       </Container>
//     );
//   }

//   return (
//     <Container size="xl" py={40}>
//       <Title
//         order={2}
//         mb={30}
//         ta="center"
//         className={classesF.title}
//         style={{ cursor: 'pointer' }}
//         onClick={handleGenderClick}
//       >
//         {gender === 'men' ? "Men's" : "Women's"} Fashion Categories
//       </Title>

//       <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" verticalSpacing="xl">
//         {categories.map((category, index) => (
//           <div key={index} className={classesF.categoryColumn}>
//             <Text fw={700} size="lg" mb="sm" className={classesF.categoryTitle}>
//               {category.title}
//             </Text>
//             <div className={classesF.categoryItems}>
//               {category.items.map((item, itemIndex) => (
//                 <Text
//                   key={itemIndex}
//                   size="sm"
//                   mb={4}
//                   className={classesF.categoryItem}
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => handleCategoryClick(category.title, item)}
//                 >
//                   {item}
//                 </Text>
//               ))}
//             </div>
//           </div>
//         ))}
//       </SimpleGrid>
//     </Container>
//   );
// };

// export default function Home() {
//   const [popular, setPopular] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const [trending, setTrending] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       const [pop, arrivals, trend] = await Promise.all([
//         fetchProducts('popular'),
//         fetchProducts('new-arrivals'),
//         fetchProducts('trending'),
//       ]);

//       setPopular(pop);
//       setNewArrivals(arrivals);
//       setTrending(trend);
//       setLoading(false);
//     };

//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <Container size="xl" py={40}>
//         <Text ta="center">Loading fashion highlights...</Text>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <HeroImageRight />

//       <Title className={classess.title}>Popular</Title>
//       <SmallCardsCarousel data={popular} />

//       <Title className={classess.title}>New Arrivals</Title>
//       <SmallCardsCarousel data={newArrivals} />

//       {/* <Title className={classess.title}>Latest Trends</Title>
//       <SmallCardsCarousel data={trending} /> */}

//       <FashionBanner />
//       <FashionCategories gender="men" />
//       <FashionCategories gender="women" />
//       <Feature />
//     </>
//   );
// }


'use client';
import { Button, Container, Text, Title, SimpleGrid } from '@mantine/core';
import classes from './HeroImageRight.module.css';
import CardsCarousel from '../homeCard/page';
import SmallCardsCarousel from './SmallCardsCarousel';
import classess from './FeaturesGrid.module.css';
import classesF from './FashionCategories.module.css';
import HomeGrid from './HomeGrid';
import Feature from './Feature';
import FashionBanner from '../fashionBanner/page';
import HeroImageRight from '../HeroImageRight/page';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: { accept: '*/*' },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: null, error: error.message || 'Network request failed' };
  }
};

const fetchProducts = async (endpoint) => {
  const { data, error } = await fetchWithErrorHandling(
    `https://fashion-api.addispages.com/api/v1/products/${endpoint}`
  );
  
  if (error) {
    return { products: [], error };
  }
  
  return { products: Array.isArray(data) ? data : [], error: null };
};

const fetchSubCategories = async () => {
  const { data, error } = await fetchWithErrorHandling(
    'https://fashion-api.addispages.com/api/v1/categories/subcategory/all'
  );
  
  if (error) {
    return { subCategories: [], error };
  }
  
  return { subCategories: data?.data || [], error: null };
};

const groupSubCategories = (subCategories, gender) => {
  const filtered = subCategories.filter(item =>
    item.categoryName.toLowerCase() === gender.toLowerCase()
  );

  const groups = {};
  filtered.forEach(item => {
    let categoryName = item.subCategoryName;
    if (categoryName.includes("'s ")) {
      categoryName = categoryName.split("'s ")[1];
    }

    const groupName = categoryName.split(' ')[0];
    if (!groups[groupName]) groups[groupName] = [];
    if (!groups[groupName].includes(item.subCategoryName)) {
      groups[groupName].push(item.subCategoryName);
    }
  });

  return Object.entries(groups).map(([title, items]) => ({
    title,
    items: items.slice(0, 4),
  }));
};

const ErrorFallback = ({ message, onRetry }) => (
  <Container size="xl" py={40} style={{ textAlign: 'center' }}>
    <Text color="red" size="lg" mb="md">
      {message || 'Something went wrong'}
    </Text>
    <Text mb="md">Please check your network connection and try again</Text>
    {onRetry && (
      <Button variant="outline" color="gray" onClick={onRetry}>
        Retry
      </Button>
    )}
    {/* You could also add an image here if you want */}
  </Container>
);

const FashionCategories = ({ gender = 'men' }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    const { subCategories, error: fetchError } = await fetchSubCategories();
    
    if (fetchError) {
      setError(fetchError);
      setLoading(false);
      return;
    }
    
    const grouped = groupSubCategories(subCategories, gender);
    setCategories(grouped);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [gender]);

  const handleCategoryClick = async (categoryTitle, item) => {
    try {
      const { subCategories, error: fetchError } = await fetchSubCategories();
      
      if (fetchError) {
        setError(fetchError);
        return;
      }
      
      const matchedSubCategory = subCategories.find(
        sub =>
          sub.subCategoryName.toLowerCase() === item.toLowerCase() ||
          sub.subCategoryName.toLowerCase().includes(item.toLowerCase())
      );

      if (matchedSubCategory) {
        const { data: products, error: productsError } = await fetchWithErrorHandling(
          `https://fashion-api.addispages.com/api/v1/products/category/${matchedSubCategory.subCategoryId}`
        );
        
        if (productsError) {
          setError(productsError);
          return;
        }
        
        if (products?.length > 0) {
          const path = `/products/${encodeURIComponent(categoryTitle.toLowerCase().replace(/\s+/g, '-'))}/${encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-').replace("'", ''))}`;
          router.push(path);
        } else {
          alert('No products found for this category.');
        }
      } else {
        console.warn('Subcategory not found');
      }
    } catch (error) {
      console.error('Error fetching subcategory products:', error);
      setError(error.message);
    }
  };

  const handleGenderClick = async () => {
    try {
      const { subCategories, error: fetchError } = await fetchSubCategories();
      
      if (fetchError) {
        setError(fetchError);
        return;
      }
      
      const matched = subCategories.find(
        sub => sub.categoryName.toLowerCase() === gender.toLowerCase()
      );

      if (matched && matched.categoryId) {
        const { data: products, error: productsError } = await fetchWithErrorHandling(
          `https://fashion-api.addispages.com/api/v1/products/category/${matched.categoryId}`
        );
        
        if (productsError) {
          setError(productsError);
          return;
        }
        
        if (products?.length > 0) {
          const path = `/products/${encodeURIComponent(gender.toLowerCase())}`;
          router.push(path);
        } else {
          alert(`No products found for ${gender}`);
        }
      }
    } catch (err) {
      console.error('Error fetching gender category products:', err);
      setError(err.message);
    }
  };

  if (error) {
    return <ErrorFallback message={error} onRetry={loadData} />;
  }

  if (loading) {
    return (
      <Container size="xl" py={40}>
        <Text ta="center">Loading categories...</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py={40}>
      <Title
        order={2}
        mb={30}
        ta="center"
        className={classesF.title}
        style={{ cursor: 'pointer' }}
        onClick={handleGenderClick}
      >
        {gender === 'men' ? "Men's" : "Women's"} Fashion Categories
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" verticalSpacing="xl">
        {categories.map((category, index) => (
          <div key={index} className={classesF.categoryColumn}>
            <Text fw={700} size="lg" mb="sm" className={classesF.categoryTitle}>
              {category.title}
            </Text>
            <div className={classesF.categoryItems}>
              {category.items.map((item, itemIndex) => (
                <Text
                  key={itemIndex}
                  size="sm"
                  mb={4}
                  className={classesF.categoryItem}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCategoryClick(category.title, item)}
                >
                  {item}
                </Text>
              ))}
            </div>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [
        { products: pop, error: popError },
        { products: arrivals, error: arrivalsError },
        { products: trend, error: trendError }
      ] = await Promise.all([
        fetchProducts('popular'),
        fetchProducts('new-arrivals'),
        fetchProducts('trending'),
      ]);

      if (popError || arrivalsError || trendError) {
        setError(popError || arrivalsError || trendError);
        return;
      }

      setPopular(pop);
      setNewArrivals(arrivals);
      setTrending(trend);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return <ErrorFallback message={error} onRetry={loadData} />;
  }

  if (loading) {
    return (
      <Container size="xl" py={40}>
        <Text ta="center">Loading fashion highlights...</Text>
      </Container>
    );
  }

  return (
    <>
      <HeroImageRight />

      <Title className={classess.title}>Popular</Title>
      {popular.length > 0 ? (
        <SmallCardsCarousel data={popular} />
      ) : (
        <Text ta="center" py="xl">No popular items found</Text>
      )}

      <Title className={classess.title}>New Arrivals</Title>
      {newArrivals.length > 0 ? (
        <SmallCardsCarousel data={newArrivals} />
      ) : (
        <Text ta="center" py="xl">No new arrivals found</Text>
      )}

      <FashionBanner />
      <FashionCategories gender="men" />
      <FashionCategories gender="women" />
      <Feature />
    </>
  );
}