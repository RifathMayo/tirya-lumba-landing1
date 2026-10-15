import { NextResponse, type NextRequest } from 'next/server';

// Halaman pendaftaran, profil, dan atur jadwal wajib login.
export function middleware(req: NextRequest) {
  if (!req.cookies.get('tl_token')) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
export const config = { matcher: ['/daftar/:path*', '/profile/:path*', '/guru/:path*'] };
