'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/context/NotificationContext'; 
import Loading from '@/app/components/Loading';
import Image from 'next/image';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showNotification } = useNotification(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        showNotification('Failed to fetch user data. Please login again.', 'danger');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [showNotification]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Your Profile</h1>
        <div className="mb-8 text-center">
          <Image
            src={user?.profileImg || '/image/profile.png'}
            alt="Profile Picture"
            width={400}
            height={400}
            className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold">{user?.name || 'Guest'}</h2>
          <p className="text-gray-500">{user?.email || 'No Email Provided'}</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => router.push('/user/profile/edit')}
            className="px-6 py-2 text-white rounded-md bg-[#4c24e5] hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
