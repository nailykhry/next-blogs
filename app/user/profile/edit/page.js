'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/context/NotificationContext'; 
import Loading from '@/app/components/Loading';
import Image from 'next/image';

export default function ProfileEdit() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('/image/profile.png');
  const [selectedFile, setSelectedFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); 
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const { name, email, profileImg } = data.user;

        setName(name || '');
        setEmail(email || '');
        setProfileImage(profileImg || '/image/profile.png');
      } catch (error) {
        console.error('Error fetching user data:', error);
        showNotification('Failed to load user data.', 'danger'); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [showNotification]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch('/api/user', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      const updatedUser = await response.json();
      console.log('Profile updated successfully:', updatedUser);
      showNotification('Profile updated successfully!', 'success'); 
      router.push('/user/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('An error occurred while updating the profile.', 'danger'); 
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Edit Profile</h1>
        <form className="space-y-4">
          <div className="text-center">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={400}
              height={400}
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-4"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c24e5]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c24e5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className={`px-6 py-2 text-white rounded-lg ${
                saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#4c24e5] text-white hover:bg-[#ebe6fc] hover:font-bold hover:text-[#4c24e5]'
              } focus:outline-none`}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
