import Link from "next/link";
import Image from "next/image";

export default function Home({mealsByCategory}:{mealsByCategory:{
        categor:string,
        meals:{
            strMeal: string,
            strMealThumb: string,
            idMeal: string,
        }[]
    }[]}) {

    const allMeals= mealsByCategory.map(caterory=>caterory.meals).flat(1)


    return (
    <div className="container mx-auto">
      <div>
          <p className={'uppercase text-xl'}>Meals</p>
      </div>
        <div className={'list grid grid-cols-6 gap-5'}>
            {

                allMeals.map(meal=>(
                         <div key={meal.idMeal}
                              className={'p-5 border border-gray-200 rounded-xl border border-gray-200 shadow-xl'}
                         >
                             <Link href={`/meal/${meal.idMeal}`} className={'flex items-center justify-center'}>

                                 <div>
                                     <Image
                                         src={meal.strMealThumb}
                                         alt=""
                                         width={100}
                                         height={100}
                                     />
                                 </div>
                                 <div>
                                     <p className={'max-w-[100px]'}>{meal.strMeal.slice(0, 18)}</p>
                                 </div>

                             </Link>

                         </div>
                ))

            }
        </div>
    </div>
    )
        ;
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
