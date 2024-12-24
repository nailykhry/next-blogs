import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const yearFilter = query.year
      ? {
          createdAt: {
            gte: new Date(`${query.year}-01-01`),
            lt: new Date(`${parseInt(query.year) + 1}-01-01`),
          },
        }
      : undefined;

    const userFilter = {
      userId: session.user.id,
    };

    const filters = {
      ...yearFilter,
      ...userFilter,
    };

    /* eslint-disable */
    const data = await Promise.all([
      prisma.post.findMany({
        include: { user: true, categories: true },
        where: filters,
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      prisma.post.count({
        where: filters,
      }),

      prisma.post.aggregate({
        where: filters,
        _sum: { views: true },
      }),

      prisma.Category.findMany({
        select: { name: true },
        where: {
          posts: {
            some: filters,
          },
        },
        orderBy: {
          posts: { _count: 'desc' },
        },
        take: 1,
      }),
    ]);

    const [posts, totalPosts, totalViews, tags] = data;

    const popularTags = tags[0]?.name;

    const viewsCount = totalViews._sum.views || 0;

    return NextResponse.json(
      {
        posts,
        totalPosts,
        viewsCount,
        popularTags,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
