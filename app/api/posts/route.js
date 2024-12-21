import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const filters = {
      categories: query.categories
        ? {
            some: { id: parseInt(query.categories) },
          }
        : undefined,
      userId: query.userId ? parseInt(query.userId) : undefined,
      title: query.title
        ? { contains: query.title, mode: 'insensitive' }
        : undefined,
      slug: query.slug || undefined,
    };

    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );

    const posts = await prisma.post.findMany({
      include: { user: true, categories: true },
      where: filters,
    });

    if (query.slug && posts.length > 0) {
      await prisma.post.update({
        where: { id: posts[0].id },
        data: {
          views: (posts[0].views || 0) + 1,
        },
      });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const generateSlug = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .trim(); // Remove leading and trailing hyphens
};

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, categories } = body;

    if (!title || !content || !categories || !Array.isArray(categories)) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        views: 0,
        userId: session.user.id,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
