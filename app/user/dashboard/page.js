'use client';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNotification } from '@/app/context/NotificationContext'; 
import PostAddIcon from '@mui/icons-material/PostAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import Loading from '@/app/components/Loading';

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState({
    totalPosts: 0,
    viewsCount: 0,
    popularTags: "-",
    posts: []
  });
  const [loading, setLoading] = useState(false);

  const { showNotification } = useNotification(); 

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const response = await fetch(`/api/dashboard?year=${selectedYear}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
          showNotification('Statistics loaded successfully!', 'success'); 
        } else {
          console.error('Failed to fetch stats');
          showNotification('Failed to load statistics.', 'danger'); 
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        showNotification('An error occurred while fetching statistics.', 'danger'); 
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [selectedYear, showNotification]);

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <h2 className="mb-1 text-2xl font-semibold">Your Dashboard</h2>
      <p className="mb-6 text-sm text-gray-500">
        Track your blog&apos;s performance with detailed stats.
      </p>

      {/* Year Filter */}
      <div className="mb-6">
        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-600">
          Select Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c24e5]"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Section */}
      {loading ? (
        <Loading />
      ) : (
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
              <h3 className="text-sm font-semibold text-gray-400">Popular Tags</h3>
              <p className="text-3xl font-bold">{stats.popularTags}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
        {stats.posts.length > 0 ? (
          <ul className="space-y-4">
            {stats.posts.map((post, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold">Published a post: &quot;{post.title}&quot;</p>
                <p className="text-sm text-gray-500">
                  {post.createdAt
                    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
                    : "Date not available"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-sm text-gray-500">You have no recent activity yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
