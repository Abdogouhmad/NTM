import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Get the access token from the cookie
  const accessToken = req.cookies.get('accessToken')?.value;

  // If the user is not authenticated and trying to access the /dashboard route
  if (!accessToken && req.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the user is authenticated and trying to access any other route
  if (accessToken && !req.nextUrl.pathname.startsWith('/dashboard')) {
    // Allow the request to continue
    return NextResponse.next();
  }

  // For all other cases (e.g., authenticated user accessing /dashboard, unauthenticated user accessing other routes)
  return NextResponse.next();
}

// Configure the matcher to apply the middleware to all routes
export const config = {
  matcher: '/dashboard',
};
