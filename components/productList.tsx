import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './pagination';

function ProductList({ items, totalPages, currentPage }:{
    totalPages:number,
    currentPage:number,
    items:{
        strMeal: string,
        strMealThumb: string,
        idMeal: string,
    }[],
}) {
  return (
    <div className="list grid grid-cols-6 gap-5">
      {

                items.map((meal) => (
                  <div
                    key={meal.idMeal}
                    className="p-5 border border-gray-200 rounded-xl border border-gray-200 shadow-xl"
                  >
                    <Link
                      href={`/meal/${meal.idMeal}`}
                      className="flex items-center justify-center"
                    >
                      <div>
                        <Image
                          src={meal.strMealThumb}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <p className="max-w-[100px]">{meal.strMeal.slice(0, 18)}</p>
                      </div>

                    </Link>

                  </div>
                ))

            }

      <div className="container mx-auto">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>

    </div>
  );
}

export default memo(ProductList);
