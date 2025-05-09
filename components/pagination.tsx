import { NextRouter, useRouter } from 'next/router';
import React from 'react';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
};

const changePage = (page: number, rout:NextRouter, count:number) => {
  if (page < 1 || page > count) return;
  rout.push(`?page=${page}`);
};

const renderPageNumbers = (totalPages:number) => {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  return [1, 2, 3, 4, 5, 6, 7, '...', totalPages];
};

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  return (
    <div className="">
      <div className="flex items-center space-x-2 mt-4">
        <button
          type="button"
          onClick={() => changePage(currentPage - 1, router, totalPages)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ←
        </button>

        {renderPageNumbers(totalPages).map((page) => (
          <button
            type="button"
            key={Math.random()}
            onClick={() => typeof page === 'number' && changePage(page, router, totalPages)}
            disabled={page === '...'}
            className={`px-3 py-1 ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } rounded disabled:opacity-50`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => changePage(currentPage + 1, router, totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
}
export default Pagination;
