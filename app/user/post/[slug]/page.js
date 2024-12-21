'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useNotification } from '@/app/context/NotificationContext'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextRenderer from '@/app/components/RichTextRenderer';
import DateFormatter from '@/app/components/DateFormatter';
import Loading from '@/app/components/Loading';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PostPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { slug } = params;
  const router = useRouter();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const { showNotification } = useNotification(); 

  useEffect(() => {
    async function fetchPostBySlug() {
      try {
        const response = await fetch(`/api/posts?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        if (data.length === 0) {
          router.replace('/404');
        } else {
          setPost(data[0]);
        }
      } catch (err) {
        setError(err.message);
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    }

    fetchPostBySlug();
  }, [slug, router]);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showNotification('Post successfully deleted!', 'success'); 
        router.push('/user/post');
      } else {
        showNotification('Failed to delete post!', 'danger'); 
      }
    } catch (err) {
      setError(err.message);
      showNotification('Failed to delete post!', 'danger'); 
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false); 
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 mx-auto bg-white rounded-lg shadow-md">
      <article>
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {userId === post.userId && (
            <div className="grid grid-flow-col gap-5">
              <button
                onClick={() => router.push(`/user/post/edit/${post.slug}`)}
                className="px-4 py-2 text-sm text-white bg-[#4c24e5] rounded-md hover:bg-[#ebe6fc] hover:text-[#4c24e5] hover:font-bold"
              >
                <EditIcon className="mr-2" /> Edit
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 hover:text-white hover:font-bold"
              >
                <DeleteIcon className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
        <p className='mb-2 font-bold text-gray-500'>
          <VisibilityIcon className="w-5 h-5 mr-1 text-gray-500" />
          {post.views} views
        </p>
        <p className="mb-6 text-gray-600">
          Created at: <DateFormatter date={post.createdAt} /> by{' '}
          <span className="font-semibold">{post.user.name}</span>
        </p>

     
        <div className="mb-6">
          <div className="mt-2 space-x-4">
            {post.categories.map((category) => (
              <button
                key={category.id}
                className="px-3 py-2 text-xs bg-[#eeebf9] text-[#4c24e5] rounded-full"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

      
        <RichTextRenderer content={post.content} />
      </article>

      {/* Modal for delete confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Are you sure you want to delete this post?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-semibold text-black bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-600 hover:text-white"
              >
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
