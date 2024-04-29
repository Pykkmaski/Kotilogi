import { JWT } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

function handleAuthorized(token: JWT, req: NextRequestWithAuth) {
  const url = new URL(req.url);

  if (token.status === 'unconfirmed') {
    const url = req.nextUrl.clone();
    url.pathname = '/user/confirm_email';
    return NextResponse.redirect(url);
  }

  if (token.status === 'unpaid' && req.nextUrl.pathname !== '/dashboard/cart') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard/cart';
    return NextResponse.redirect(url);
  }

  if (url.pathname === 'dashboard') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard/properties';
    return NextResponse.redirect(url);
  }

  if (url.pathname === 'login') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard/properties';
    return NextResponse.redirect(url);
  }
}

async function middleware(req: NextRequestWithAuth) {
  const { token } = req.nextauth;

  if (token) {
    return handleAuthorized(token, req);
  }
}

export default withAuth(middleware);

export const config = {
  matcher: ['/dashboard/:path*', '/properties/:path*', '/events/:path*'],
};
