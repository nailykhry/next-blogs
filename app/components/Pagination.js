'use client';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-[#4c24e5] rounded-md hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5] disabled:bg-gray-400 disabled:text-white"
      >
        Previous
      </button>
      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-[#4c24e5] rounded-md hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5] disabled:bg-gray-400 disabled:text-white"
      >
        Next
      </button>
    </div>
  );
}
