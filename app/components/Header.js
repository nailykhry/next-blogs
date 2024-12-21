'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <header className="flex items-center justify-between p-4 text-black">
        <h1 className="text-sm font-semibold">Loading your dashboard...</h1>
      </header>
    );
  }

  if (!user) {
    return (
      <header className="flex items-center justify-between p-4 text-black">
        <h1 className="text-sm font-semibold">You are not logged in</h1>
        <button
          className="p-2 text-sm text-white bg-blue-500 rounded"
          onClick={() => (window.location.href = '/api/auth/signin')}
        >
          Login
        </button>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 text-black">
      <h1 className="text-sm font-bold">Welcome to your Dashboard</h1>
      <div className="flex items-center space-x-4">
        <p className="text-sm">Hello, {user.name}</p>
        <Image
          src={user.profileImg || '/image/profile.png'}
          alt="User Profile"
          width={100}
          height={100}
          className="w-10 h-10 border-2 border-[#4c24e5] rounded-full"
        />
      </div>
    </header>
  );
}
