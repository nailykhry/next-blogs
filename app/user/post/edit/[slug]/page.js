'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Listbox } from '@headlessui/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useNotification } from '@/app/context/NotificationContext';

const TextEditor = dynamic(() => import('@/app/components/TextEditor'), {
  ssr: false,
});

export default function EditPostPage() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { showNotification } = useNotification();
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const postResponse = await fetch(`/api/posts?slug=${slug}`);
        if (postResponse.ok) {
          const postData = await postResponse.json();
          setId(postData[0].id);
          setTitle(postData[0].title);
          setContent(postData[0].content);

          setSelectedCategories(
            postData[0].categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))
          );
        } else {
          console.error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content,
          categories: selectedCategories.map((category) => category.id),
        }),
      });

      if (response.ok) {
        showNotification('Post updated successfully!', 'success');
        router.push('/user/post');
      } else {
        showNotification('Error updating post. Please try again.', 'error');
      }
    } catch (error) {
      showNotification('Error updating post. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c24e5]"
            required
          />
        </div>

        {/* Categories Dropdown */}
        <div className="w-full">
          <label htmlFor="categories" className="block text-lg font-bold">
            Categories
          </label>
          <Listbox
            value={selectedCategories}
            onChange={setSelectedCategories}
            multiple
          >
            <div className="relative">
              {/* Dropdown Button */}
              <Listbox.Button className="w-full px-4 py-3 text-left bg-white border rounded-lg shadow-sm focus:outline-none">
                {selectedCategories.length > 0
                  ? selectedCategories
                      .map((category) => category.name)
                      .join(', ')
                  : 'Select categories...'}
              </Listbox.Button>

              {/* Dropdown Options */}
              <Listbox.Options className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border rounded-lg shadow-lg max-h-60">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    value={category}
                    className={({ active }) =>
                      `px-4 py-2 text-sm cursor-pointer select-none ${
                        active ? 'bg-gray-100 text-[#4c24e5]' : 'text-gray-800'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-2">
                        <span
                          className={`block ${selected ? 'font-bold' : ''}`}
                        >
                          {category.name}
                        </span>
                        {selected && <span className="text-[#4c24e5]">✔</span>}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-lg font-bold">Content</label>
          <TextEditor value={content} onChange={(value) => setContent(value)} />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex gap-4">
          <Link href="/user/post">
            <button
              type="button"
              className="w-full px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-400 hover:text-white sm:w-auto"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className={`w-full sm:w-auto px-4 py-2 bg-[#4c24e5] hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5] text-white rounded-md ${
              isSubmitting ? 'opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
