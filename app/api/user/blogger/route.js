import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismaClient';
export async function GET() {
  try {
    const user = await prisma.User.findMany({
      select: {
        id: true,
        name: true,
        profileImg: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (e) {
    console.error('Error get user:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
