'use client';
import { use, useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import StatusLoad from '@/app/components/StatusLoad';
import InfiniteScroll from '@/app/components/InfiniteScroll';
import SearchBar from '@/app/components/SearchBar';
import PostCard from '@/app/components/PostCard';

const Categories = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const { id } = params;
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const postsPerLoad = 6;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/posts/?userId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setCategory(data[0]?.user);
          setDisplayedPosts(data.slice(0, postsPerLoad));
          setFilteredPosts(data.slice(0, postsPerLoad));
          setHasMore(data.length > postsPerLoad);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [id]);

 
  const loadMorePosts = () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedPosts.length;
      const nextPosts = posts.slice(
        currentLength,
        currentLength + postsPerLoad
      );

      setDisplayedPosts([...displayedPosts, ...nextPosts]);
      setFilteredPosts([...displayedPosts, ...nextPosts]);
      setHasMore(currentLength + nextPosts.length < posts.length);
      setLoading(false);
    }, 1000);
  };

 
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPosts(displayedPosts);
    } else {
      const filtered = displayedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-white">
        <div className="max-w-6xl px-6 py-12 mx-auto">
         
          <section className="text-center">
            <h1 className="text-4xl font-bold text-[#4c24e5]">
              {category?.name} Posts
            </h1>
            <p className="mt-4 mb-10 text-lg text-gray-600">
              Dive into a variety of {category?.name}&apo;s Posts.
            </p>
          </section>

          <SearchBar onSearch={handleSearch} />

          {!filteredPosts?.length && (
            <h2 className="pt-5 mt-5 text-center text-gray-500">
              Belum ada data post!
            </h2>
          )}

          <div className="grid items-center w-3/4 grid-cols-1 gap-6 p-4 mx-4 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.user.name}
                slug={post.slug}
              />
            ))}
          </div>

          <StatusLoad loading={loading} hasMore={hasMore} />
          <InfiniteScroll
            onLoadMore={loadMorePosts}
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
