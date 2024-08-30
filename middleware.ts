import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { rateLimiter } from './utils/rateLimiter';

export default async function middleware(req: NextRequestWithAuth) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });

  if (pathname.startsWith('/api/admin')) {
    //Check for the api-key on admin routes.
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
    //Limit the requests of public api-routes.

    const res = await rateLimiter.limit(req);
    if (res.status == 429) {
      return res;
    }
  }

  if (pathname.startsWith('/api/protected') || pathname.startsWith('/dashboard')) {
    //Only allow logged-in users to make requests to protected routes, or accessing routes under /dashboard.
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
    '/api/public/:path*',
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/api/admin/:path*',
  ],
};
