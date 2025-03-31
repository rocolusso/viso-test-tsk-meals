import React from 'react';
import {SingleMeals} from "./../../lib/types";
import Image from "next/image";
import {useRouter} from "next/router";

const SingleReceipt = ({meals}:{meals:SingleMeals}) => {
   const router = useRouter();

    return (
        <div className={'cotainer mx-auto flex justify-center items-center'}>
            <div className={'relative mt-5 max-w-[800px] grid grid-cols-2 rounded-xl border border-gray-200 shadow-xl'}>
                <div className={'absolute top-0 left-[-40px]'}>
                    <button
                        onClick={() => {router.push('/')}}
                        type={'button'}
                        className={'px-5 py-3 bg-black text-white rounded cursor-pointer'}
                    >BACK</button>
                </div>
                <div >
                    <Image
                        className={'p-5 rounded-xl'}
                        src={meals.strMealThumb}
                        alt={'preview'}
                        width={400}
                        height={400}
                    />
                </div>
                <div className={'p-5'}>
                    <div>
                        id: {meals.idMeal}
                    </div>
                    <div>
                        <p>Name: {meals.strMeal}</p>
                    </div>
                    <div>
                        <p>Category: {meals.strCategory}</p>
                    </div>
                    <div>
                        <p>Area: {meals.strArea}</p>
                    </div>
                    <div>
                        <p>Tags: {meals.strTags}</p>
                    </div>
                    <div>
                        <p>Instructions: </p>
                        <div className={'p-5'}>
                            {meals.strInstructions}
                        </div>
                    </div>
                    <div className={'ingredients'}>
                        <div>
                            <p>Ingredients</p>
                        </div>
                        <ul className={'p-5 grid grid-cols-2 rounded-xl border border-gray-200 '}>
                            {meals.strIngredient1 && <li><div><p>{meals.strIngredient1}</p></div></li>}
                            {meals.strIngredient2 && <li><div><p>{meals.strIngredient2}</p></div></li>}
                            {meals.strIngredient3 && <li><div><p>{meals.strIngredient3}</p></div></li>}
                            {meals.strIngredient4 && <li><div><p>{meals.strIngredient4}</p></div></li>}
                            {meals.strIngredient5 && <li><div><p>{meals.strIngredient5}</p></div></li>}
                            {meals.strIngredient6 && <li><div><p>{meals.strIngredient6}</p></div></li>}
                            {meals.strIngredient7 && <li><div><p>{meals.strIngredient7}</p></div></li>}
                            {meals.strIngredient8 && <li><div><p>{meals.strIngredient8}</p></div></li>}
                            {meals.strIngredient9 && <li><div><p>{meals.strIngredient9}</p></div></li>}
                            {meals.strIngredient10 && <li><div><p>{meals.strIngredient10}</p></div></li>}
                            {meals.strIngredient11 && <li><div><p>{meals.strIngredient11}</p></div></li>}
                            {meals.strIngredient12 && <li><div><p>{meals.strIngredient12}</p></div></li>}
                            {meals.strIngredient13 && <li><div><p>{meals.strIngredient13}</p></div></li>}
                            {meals.strIngredient14 && <li><div><p>{meals.strIngredient14}</p></div></li>}
                            {meals.strIngredient15 && <li><div><p>{meals.strIngredient15}</p></div></li>}
                            {meals.strIngredient16 && <li><div><p>{meals.strIngredient16}</p></div></li>}
                            {meals.strIngredient17 && <li><div><p>{meals.strIngredient17}</p></div></li>}
                            {meals.strIngredient18 && <li><div><p>{meals.strIngredient18}</p></div></li>}
                            {meals.strIngredient19 && <li><div><p>{meals.strIngredient19}</p></div></li>}
                            {meals.strIngredient20 && <li><div><p>{meals.strIngredient20}</p></div></li>}

                        </ul>
                    </div>
                    <div className={'rounded-xl p-3 border border-gray-200'}>
                        <div>
                            <p>YouTube:</p>
                            <p>{meals.strYoutube}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SingleReceipt;

export async function getServerSideProps({params}: { params: { id: string } }) {
    const {id} = params;
    const fetchMealData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const getMealData = await fetchMealData.json()
    const meals = getMealData.meals[0];

    return {
        props: {
            meals
        }
    }
}

