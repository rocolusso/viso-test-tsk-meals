import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ProductList from '../components/productList';

export default function Home({ mealsByCategory }:{mealsByCategory:{
        categor:string,
        meals:{
            strMeal: string,
            strMealThumb: string,
            idMeal: string,
        }[]
    }[]}) {
  const router = useRouter();
  let currentPage = Number(router.query.page) || 1;

  const allMeals = mealsByCategory.map(
    (caterory) => caterory.meals,
  ).flat(1);

  const itemsPerPage = 12;
  const totalMeals = allMeals.length;

  const totalPages = Math.ceil(totalMeals / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDishes = allMeals.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const url = router.asPath;
    const page = url.split('page=')[1];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentPage = Number(page);
  }, [currentPage, router]);

  return (
    <div className="container mx-auto">
      <div>
        <p className="uppercase text-xl">Meals</p>
      </div>

      <ProductList
        currentPage={currentPage}
        totalPages={totalPages}
        items={currentDishes}
      />

    </div>
  );
}

export async function getStaticProps() {
  const fetchMealCategories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const getMealCategories = await fetchMealCategories.json();

  if (!getMealCategories.categories) {
    return { notFound: true };
  }

  const categories = getMealCategories.categories.map(
    (category:{strCategory:string}) => category.strCategory,
  );

  const mealsPromises = categories.map(async (categor:{strCategory:string}) => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categor}`;
    const mealsRes = await fetch(mealsUrl);
    const mealsData = await mealsRes.json();
    return { categor, meals: mealsData.meals || [] };
  });

  const mealsByCategory = await Promise.all(mealsPromises);

  return {
    props: {
      mealsByCategory: mealsByCategory || [],
    },
    revalidate: 5,
  };
}
