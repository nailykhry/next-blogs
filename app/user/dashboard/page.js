import { formatDistanceToNow } from 'date-fns';
import { headers } from 'next/headers';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import YearSelector from '@/app/components/YearSelector';

export default async function DashboardPage({ searchParams }) {
  const { year } = await searchParams;
  const selectedYear = year || new Date().getFullYear();

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/dashboard?year=${selectedYear}`,
    {
      cache: 'no-store',
      method: 'GET',
      headers: await headers(),
    }
  );

  const data = await res.json();

  const stats = data || {
    totalPosts: 0,
    viewsCount: 0,
    popularTags: '-',
    posts: [],
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div>
      <h2 className="mb-1 text-2xl font-semibold">Your Dashboard</h2>
      <p className="mb-6 text-sm text-gray-500">
        Track your blog&apos;s performance with detailed stats.
      </p>

      <YearSelector selectedYear={selectedYear} years={years} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
          <PostAddIcon className="text-[#4c24e5] w-10 h-10 mr-6" />
          <div>
            <h3 className="text-sm font-semibold text-gray-400">Total Posts</h3>
            <p className="text-3xl font-bold">{stats.totalPosts}</p>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
          <VisibilityIcon className="text-[#4c24e5] w-10 h-10 mr-6" />
          <div>
            <h3 className="text-sm font-semibold text-gray-400">Total Views</h3>
            <p className="text-3xl font-bold">{stats.viewsCount}</p>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
          <PeopleIcon className="text-[#4c24e5] w-10 h-10 mr-6" />
          <div>
            <h3 className="text-sm font-semibold text-gray-400">
              Popular Tags
            </h3>
            <p className="text-3xl font-bold">{stats.popularTags}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
        {Array.isArray(stats.posts) && stats.posts.length > 0 ? (
          <ul className="space-y-4">
            {stats.posts.map((post, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold">
                  Published a post: &quot;{post.title}&quot;
                </p>
                <p className="text-sm text-gray-500">
                  {post.createdAt
                    ? formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })
                    : 'Date not available'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-sm text-gray-500">
              You have no recent activity yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
