import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { rateLimiter } from './utils/rateLimiter';

export default async function middleware(req: NextRequestWithAuth) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });

  //Check for the api-key on admin routes.
  if (pathname.startsWith('/api/admin')) {
    const authorization = req.headers.get('Authorization');
    const key = authorization && authorization.split(' ')[1];

    if (key !== process.env.API_KEY) {
      return new NextResponse('API-avain vaaditaan.', {
        status: 401,
        statusText: 'Kielletty.',
      });
    }
  }
  if (pathname.startsWith('/api/public')) {
    const res = await rateLimiter.limit(req);
    if (res.status == 429) {
      return res;
    }
  }

  //Only allow logged-in users to make requests to protected routes, or accessing routes under /dashboard.
  if (pathname.startsWith('/api/protected') || pathname.startsWith('/dashboard')) {
    if (!token) {
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const hostname = req.headers.get('Host');
      const url = `${protocol}://${hostname}/login`;
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/login')) {
    if (token) {
      //Already logged in. Redirect to the dashboard.
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const hostname = req.headers.get('Host');
      const url = `${protocol}://${hostname}/dashboard`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/public/users/activate/send',
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/api/admin/:path*',
  ],
};
