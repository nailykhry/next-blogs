'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PostCard from '@/app/components/PostCard';
import SearchBar from '@/app/components/SearchBar';
import Pagination from '@/app/components/Pagination';
import Loading from '@/app/components/Loading';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  /* eslint-disable */
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts`);
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPage(1);
  };

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="mb-1 text-2xl font-semibold">Community Posts</h2>
      <p className="mb-6 text-sm text-gray-500">
        Explore insights, experiences, and ideas from our vibrant community to
        help you grow.
      </p>

      <SearchBar onSearch={handleSearch} />

      {filteredPosts.length === 0 ? (
        <div className="text-center p-6 mt-6 bg-[#f9fafb] rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black">
            There is no post yet!
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Start sharing your thoughts with your audience.
          </p>
          <Link
            href="/user/post/create"
            className="inline-block px-6 py-2 text-sm text-white bg-[#4c24e5] rounded-md hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]"
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
            {currentPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.user.name}
                slug={post.slug}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
