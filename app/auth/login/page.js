'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useNotification } from '@/app/context/NotificationContext'; 

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError(result.error); 
      showNotification('Invalid credentials. Please try again.', 'error');
    } else {
      setError(null);
      showNotification('Login successful!', 'success');; 
      router.push('/user/dashboard'); 
    }
  };

  return (
    <section className="bg-[url('/background.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Sign in to your account
        </h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4c24e5] block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4c24e5] block w-full p-2.5"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-red-700 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#4c24e5] text-white rounded-xl hover:bg-[#ebe6fc] hover:text-[#4c24e5] hover:font-bold"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-500">
            Don&apos;t have an account yet?{' '}
            <a
              href="/auth/register"
              className="font-medium text-[#4c24e5] hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
