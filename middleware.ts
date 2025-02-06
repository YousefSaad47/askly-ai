import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoutes = [
  '/create-chatbot',
  '/view-chatbots',
  '/review-sessions',
  '/edit-chatbot/(.*)',
  '/user-profile',
];

const isProtectedRoute = createRouteMatcher(protectedRoutes);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname === '/api/graphql' && !(await auth()).userId) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message:
          'You need to be logged in to access this resource. Please log in and try again.',
      },
      { status: 401 }
    );
  }
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
