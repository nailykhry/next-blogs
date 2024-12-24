import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SearchBar from '@/app/components/SearchBar';
import Pagination from '@/app/components/Pagination';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

export default async function PostsPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  const { page = '1', search = '' } = await searchParams;
  const currentPage = parseInt(page, 10);
  const searchQuery = search;

  const POSTS_PER_PAGE = 6;
  const userId = session?.user?.id;
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts?userId=${userId}&page=${currentPage}&pageSize=${POSTS_PER_PAGE}&search=${encodeURIComponent(searchQuery)}`,
    { method: 'GET' }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }

  const data = await res.json();
  const totalPosts = data.totalPosts;
  const posts = data.posts;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div>
      <h2 className="mb-1 text-2xl font-semibold">Your Posts</h2>
      <p className="mb-6 text-sm text-gray-500">
        See your blog posts and manage your content.
      </p>

      <SearchBar initialQuery={searchQuery} />

      {posts.length === 0 ? (
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
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.user.name}
                slug={post.slug}
              />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
