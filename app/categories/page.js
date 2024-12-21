'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatusLoad from '../components/StatusLoad';
import InfiniteScroll from '../components/InfiniteScroll';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const categoriesPerLoad = 6;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          setDisplayedCategories(data.slice(0, categoriesPerLoad));
          setHasMore(data.length > categoriesPerLoad);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const loadMoreCategories = () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedCategories.length;
      const nextCategories = categories.slice(
        currentLength,
        currentLength + categoriesPerLoad
      );

      setDisplayedCategories([...displayedCategories, ...nextCategories]);
      setHasMore(currentLength + nextCategories.length < categories.length);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-white">
        <div className="max-w-6xl px-6 py-12 mx-auto">
          <section className="px-4 text-center md:px-8">
            <h1 className="text-3xl font-bold text-[#4c24e5] md:text-4xl lg:text-5xl">
              Blog Categories
            </h1>
            <p className="mt-4 text-base text-gray-600 md:text-lg lg:mt-6 lg:max-w-xl lg:mx-auto">
              Explore diverse topics and find the blogs that inspire and inform
              you.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {displayedCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-[#4c24e5]">
                  {category.name}
                </h2>
                <p className="mt-2 text-gray-600">{category.description}</p>
                <Link
                  href={`/categories/${category.id}`}
                  className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white bg-[#4c24e5] rounded hover:opacity-90 transition-opacity"
                >
                  Explore Blogs
                </Link>
              </div>
            ))}
          </section>

          <StatusLoad loading={loading} hasMore={hasMore} />
          <InfiniteScroll
            onLoadMore={loadMoreCategories}
            hasMore={hasMore}
            loading={loading}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categories;
