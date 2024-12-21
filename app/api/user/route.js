import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import prisma from '../../lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.User.findUnique({
      where: { id: session.user.id },
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

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const formData = await req.formData();

    const userId = session.user.id;
    const name = formData.get('name');
    const email = formData.get('email');
    const profileImg = formData.get('file');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (profileImg) {
      const buffer = Buffer.from(await profileImg.arrayBuffer());
      const fileName = `${userId}-${Date.now()}.jpg`; 
      const filePath = path.join(process.cwd(), 'public/image', fileName);

      await fs.writeFile(filePath, buffer);
      updateData.profileImg = `/image/${fileName}`;
    }

    const updatedUser = await prisma.User.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
