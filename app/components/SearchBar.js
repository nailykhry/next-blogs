import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(query);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Search something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-1/3 px-4 py-2 border border-gray-300 rounded-l-2xl focus:outline-none focus:border-[#4c24e5]"
      />
      <button
        onClick={handleSearch}
        className="flex flex-row gap-2 px-4 py-2 rounded-r-2xl  bg-[#4c24e5] text-base font-medium text-white hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]"
      >
        <MagnifyingGlassIcon
          className="w-6 h-6 font-bold text-white hover:font-bold hover:text-[#4c24e5]"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default SearchBar;
