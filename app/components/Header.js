import Image from 'next/image';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Header() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/auth/login');
  }

  let user = null;

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
      cache: 'no-store',
      method: 'GET',
      headers: await headers(),
    });

    if (response.ok) {
      const data = await response.json();
      user = data.user;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  if (!user) {
    redirect('/auth/login');
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
