import React from 'react';
import {SingleMeals} from "./../../lib/types";
import Image from "next/image";

const SingleReceipt = ({meals}:{meals:SingleMeals}) => {
    return (
        <div className={'cotainer mx-auto flex justify-center items-center'}>
            <div className={' mt-5 max-w-[800px] grid grid-cols-2 rounded-xl border border-gray-200 shadow-xl'}>
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
                    <div >
                        <p>Instructions: </p>
                        <div className={'p-5'}>
                            {meals.strInstructions}
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

