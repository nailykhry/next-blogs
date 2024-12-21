'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/context/NotificationContext';

export default function RegisterPage() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match!', 'danger');
      return;
    }
    if (!formData.acceptTerms) {
      showNotification('You must accept the Terms and Conditions!', 'danger');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification(
          'Registration successful! Redirecting to login...',
          'success'
        );
        router.push('/auth/login');
      } else {
        const error = await response.json();
        showNotification(`Registration failed: ${error.message}`, 'danger');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      showNotification(
        'An error occurred while submitting the form.',
        'danger'
      );
    }
  };

  return (
    <section className="bg-[url('/background.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 bg-white border rounded-lg shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Create an account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4c24e5] block w-full p-2.5"
              placeholder="Full Name"
              required
            />
          </div>

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
              className="bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4c24e5] block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4c24e5] block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-start">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 text-[#4c24e5] focus:ring-[#4c24e5] border-gray-300 rounded"
              required
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-500">
              I accept the{' '}
              <a
                href="#"
                className="font-medium text-[#4c24e5] hover:underline"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#4c24e5] text-white rounded-xl text-sm font-medium hover:bg-[#ebe6fc] hover:text-[#4c24e5] hover:font-bold"
          >
            Create an account
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="font-medium text-[#4c24e5] hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
