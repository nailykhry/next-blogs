'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Image from 'next/image';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-white bg-[#4c24e5] sm:hidden fixed top-5 left-5 rounded-md shadow-lg"
        aria-label="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div
        className={`fixed z-50 min-h-screen p-5 m-5 rounded-lg bg-white shadow-lg text-black w-64 transform ${
          isOpen ? 'translate-x-0 left-5 top-20' : '-translate-x-full hidden'
        } transition-transform sm:translate-x-0 sm:static sm:block`}
      >
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/logo.png"
            layout="intrinsic"
            width={200}
            height={200}
            className="w-20 h-20"
            alt="logo"
          />
        </div>

        <h2 className="mb-5 text-xl font-semibold text-center">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/user/dashboard"
              className={`flex items-center p-2 text-sm rounded font-bold ${
                isActive('/user/dashboard')
                  ? 'bg-[#4c24e5] text-white'
                  : 'hover:bg-[#eeebf9] hover:text-[#4c24e5]'
              }`}
            >
              <HomeIcon className="w-6 h-6 mr-3" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/user/post/explore"
              className={`flex items-center p-2 text-sm rounded font-bold ${
                isActive('/user/post/explore')
                  ? 'bg-[#4c24e5] text-white'
                  : 'hover:bg-[#eeebf9] hover:text-[#4c24e5]'
              }`}
            >
              <MenuBookIcon className="w-6 h-6 mr-3" />
              Explore Post
            </Link>
          </li>
          <li>
            <Link
              href="/user/post/create"
              className={`flex items-center p-2 text-sm rounded font-bold ${
                isActive('/user/post/create')
                  ? 'bg-[#4c24e5] text-white'
                  : 'hover:bg-[#eeebf9] hover:text-[#4c24e5]'
              }`}
            >
              <AddIcon className="w-6 h-6 mr-3" />
              Create Post
            </Link>
          </li>
          <li>
            <Link
              href="/user/post"
              className={`flex items-center p-2 text-sm rounded font-bold ${
                isActive('/user/post')
                  ? 'bg-[#4c24e5] text-white'
                  : 'hover:bg-[#eeebf9] hover:text-[#4c24e5]'
              }`}
            >
              <PostAddIcon className="w-6 h-6 mr-3" />
              My Post
            </Link>
          </li>
          <li>
            <Link
              href="/user/profile"
              className={`flex items-center p-2 text-sm rounded font-bold ${
                isActive('/user/profile')
                  ? 'bg-[#4c24e5] text-white'
                  : 'hover:bg-[#eeebf9] hover:text-[#4c24e5]'
              }`}
            >
              <PersonIcon className="w-6 h-6 mr-3" />
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center p-2 text-sm font-bold text-red-500 rounded hover:bg-red-100"
            >
              <LogoutIcon className="w-6 h-6 mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
        />
      )}
    </>
  );
}
