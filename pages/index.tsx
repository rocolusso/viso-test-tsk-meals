export default function Home({mealsByCategory}:{mealsByCategory:{
        categor:string,
        meals:{
            strMeal: string,
            strMealThumb: string,
            idMeal: string,
        }[]
    }[]}) {




    return (
    <div>
      start
    </div>
  );
}

export async function getStaticProps() {

    const fetchMealCategories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const getMealCategories = await fetchMealCategories.json()

    if (!getMealCategories.categories) {
        return { notFound: true };
    }

    const categories = getMealCategories.categories.map((category:{strCategory:string}) => category.strCategory);

    const mealsPromises = categories.map(async (categor:{strCategory:string}) => {
        const mealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categor}`;
        const mealsRes = await fetch(mealsUrl);
        const mealsData = await mealsRes.json();
        return { categor, meals: mealsData.meals || [] };
    });

    const mealsByCategory = await Promise.all(mealsPromises);

    return {
        props: {
            mealsByCategory
        },
        revalidate: 5
    };
}
