import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismaClient';

export async function GET() {
  try {
    const categories = await prisma.Category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description } = body;
    const newCategory = await prisma.Category.create({ name, description });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
