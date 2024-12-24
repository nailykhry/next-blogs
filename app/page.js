'use client';
import { useEffect, useState } from 'react';
import SearchBarStatic from '@/app/components/SearchBarStatic';
import Navbar from '@/app/components/Navbar';
import PostCard from '@/app/components/PostCard';
import Footer from '@/app/components/Footer';
import StatusLoad from '@/app/components/StatusLoad';
import InfiniteScroll from '@/app/components/InfiniteScroll';
import MainHeader from '@/app/components/MainHeader';

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
      setPosts(data.posts);
      setFilteredPosts(data.posts);
      setDisplayedPosts(data.posts.slice(0, postsPerLoad));
    }
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPosts(posts);
      setDisplayedPosts(posts.slice(0, postsPerLoad));
      setHasMore(posts.length > postsPerLoad);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
      setDisplayedPosts(filtered.slice(0, postsPerLoad));
      setHasMore(filtered.length > postsPerLoad);
    }
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
          <SearchBarStatic onSearch={handleSearch} />

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
