'use client';
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages }) => {
  const handlePreviousClick = (e) => {
    if (currentPage <= 1) {
      e.preventDefault();
    }
  };

  const handleNextClick = (e) => {
    if (currentPage >= totalPages) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-between mt-4 space-x-2">
      <Link
        href={`?page=${currentPage - 1}`}
        className={`px-3 py-2 border rounded ${currentPage <= 1 ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-blue-600 border-blue-600 hover:bg-blue-100'}`}
        aria-disabled={currentPage <= 1}
        onClick={handlePreviousClick}
      >
        Previous
      </Link>

      <span className="px-3 py-2 text-gray-800">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`?page=${currentPage + 1}`}
        className={`px-3 py-2 border rounded ${currentPage >= totalPages ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-blue-600 border-blue-600 hover:bg-blue-100'}`}
        aria-disabled={currentPage >= totalPages}
        onClick={handleNextClick}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
