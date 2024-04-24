import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isPublicRoute = path === '/register' || path === '/login';

  if (path.startsWith('/api/auth')) return null;

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/', request.nextUrl));

  if (!isPublicRoute && !token)
    return NextResponse.redirect(new URL('/login', request.nextUrl));
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
