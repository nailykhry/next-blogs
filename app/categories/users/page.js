'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import UserCard from '@/app/components/UserCard';
import Pagination from '@/app/components/Pagination';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const CategoriesUsers = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/user/blogger`);
        const data = await response.json();
        console.log('Fetched users:', data);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchPosts();
  }, []);

  const POSTS_PER_PAGE = 15;
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentUsers = user.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(user.length / POSTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen py-24">
        <h1 className="text-4xl font-bold text-[#4c24e5]">Meet Our Blogger</h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover the minds behind the stories. Connect, learn, and get
          inspired.
        </p>

        <div>
          {currentUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 mt-6 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/categories/users/${user.id}`}
                  passHref
                >
                  <UserCard
                    key={user.id}
                    name={user.name}
                    imageUrl={user.profileImg}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-600">No users available to display.</p>
          )}

          {currentUsers.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesUsers;
