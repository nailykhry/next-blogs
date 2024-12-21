import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `px-3 py-2 text-sm rounded-md hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5] ${
      isActive
        ? 'underline text-sm text-gray-800 font-bold'
        : 'text-gray-700 font-medium'
    }`;
  };

  return (
    <nav className="fixed w-full bg-white shadow-md">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="logo"
            layout="intrinsic"
            width={200}
            height={200}
            className="flex-shrink-0 w-10 h-10"
          />

          {/* Hamburger button for mobile */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="items-center justify-center p-2 text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-black"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:ml-6 sm:space-x-4">
            <Link href="/" className={getLinkClass('/')}>
              Home
            </Link>
            <Link href="/categories" className={getLinkClass('/categories')}>
              Categories
            </Link>
            <Link href="/about" className={getLinkClass('/about')}>
              About
            </Link>
            <Link
              href="/categories/users"
              className={getLinkClass('/categories/users')}
            >
              Users
            </Link>
            <Link
              href="/auth/login"
              className="flex flex-row px-3 py-2 bg-[#4c24e5] text-sm font-medium text-white rounded-md hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]`}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className={`block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]`}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]`}
          >
            About
          </Link>
          <Link
            href="/categories/users"
            className={`block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]`}
          >
            Users
          </Link>
          <Link
            href="/auth/login"
            className="block px-3 py-2 bg-[#4c24e5] text-sm font-medium text-white rounded-md hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
