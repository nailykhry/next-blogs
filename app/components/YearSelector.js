'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function YearSelector({ defaultYear }) {
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const router = useRouter();

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    router.push(`/user/dashboard?year=${newYear}`);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="year"
        className="block mb-2 text-sm font-medium text-gray-600"
      >
        Select Year
      </label>
      <select
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c24e5]"
      >
        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
    </div>
  );
}
