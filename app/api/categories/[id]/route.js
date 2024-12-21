import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismaClient';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const category = await prisma.Category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
