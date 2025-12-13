import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip i18n for portal routes and API routes
  if (pathname.startsWith('/portal') || pathname.startsWith('/api')) {
    return await updateSession(request);
  }
  
  // Handle internationalization first (this will handle locale routing)
  const intlResponse = intlMiddleware(request);
  
  // Handle Supabase session
  const supabaseResponse = await updateSession(request);
  
  // If Supabase redirects (e.g., auth redirect), use that
  if (supabaseResponse && supabaseResponse.status >= 300 && supabaseResponse.status < 400) {
    return supabaseResponse;
  }
  
  // Merge headers if needed
  if (supabaseResponse && supabaseResponse.headers) {
    supabaseResponse.headers.forEach((value, key) => {
      intlResponse.headers.set(key, value);
    });
  }
  
  return intlResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - portal (portal routes don't need locale)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|portal|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mov)$).*)',
  ],
}



