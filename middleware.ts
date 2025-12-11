import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle Supabase session first
  const supabaseResponse = await updateSession(request);
  
  // If Supabase redirects (e.g., auth redirect), use that
  if (supabaseResponse && supabaseResponse.status >= 300 && supabaseResponse.status < 400) {
    return supabaseResponse;
  }
  
  // Then handle internationalization
  const intlResponse = intlMiddleware(request);
  
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
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}



