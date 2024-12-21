import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the user is accessing a protected route
  if (req.nextUrl.pathname.startsWith('/user')) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'], // Matches all /user/* routes
};
