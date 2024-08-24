import { JWT } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

async function middleware(req: NextRequestWithAuth) {
  const { token } = req.nextauth;
  if (token) {
    const url = new URL(req.url);

    if (token.status === 'unconfirmed') {
      const url = req.nextUrl.clone();
      url.pathname = '/user/confirm_email';
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/dashboard')) {
      const url = req.nextUrl.clone();

      url.pathname = `/newDashboard`;
      return NextResponse.redirect(url);
    }
  } else {
    return NextResponse.next();
  }
}

export default withAuth(middleware);

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
