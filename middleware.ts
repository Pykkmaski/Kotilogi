import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';

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
  //Only allow logged-in users to make requests to protected routes.
  else if (pathname.startsWith('/api/protected') || pathname.startsWith('/dashboard')) {
    if (!token) {
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const hostname = req.headers.get('Host');
      const url = `${protocol}://${hostname}/login`;
      return NextResponse.redirect(url);
    }
  } else if (pathname.startsWith('/login')) {
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
  matcher: ['/dashboard/:path*', '/api/protected/:path*', '/api/admin/:path*'],
};
