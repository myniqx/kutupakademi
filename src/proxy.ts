import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const supabaseResponse = await updateSession(request);

  if (supabaseResponse.status === 307 || supabaseResponse.status === 308) {
    return supabaseResponse;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
