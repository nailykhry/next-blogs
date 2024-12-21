'use client';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import Footer from './components/Footer';
import StatusLoad from './components/StatusLoad';
import InfiniteScroll from './components/InfiniteScroll';
import MainHeader from './components/MainHeader';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const postsPerLoad = 6;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
      setDisplayedPosts(data.slice(0, postsPerLoad));
    }
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
    setDisplayedPosts(filtered.slice(0, postsPerLoad));
    setHasMore(filtered.length > postsPerLoad);
  };

  const loadMorePosts = () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedPosts.length;
      const nextPosts = filteredPosts.slice(
        currentLength,
        currentLength + postsPerLoad
      );

      setDisplayedPosts([...displayedPosts, ...nextPosts]);
      setHasMore(currentLength + nextPosts.length < filteredPosts.length);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container flex flex-col items-center justify-center pt-20 mx-auto">
          <MainHeader />
          <SearchBar onSearch={handleSearch} />

          {!filteredPosts?.length && (
            <h2 className="pt-5 mt-5 text-center text-gray-500">
              Belum ada data post!
            </h2>
          )}

          <div className="grid items-center w-3/4 grid-cols-1 gap-6 p-4 mx-4 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
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
      </main>
      <Footer />
    </div>
  );
}
