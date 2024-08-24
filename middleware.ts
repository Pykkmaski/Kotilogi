import { getToken, JWT } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api/admin')) {
    const authorization = req.headers.get('Authorization');
    const key = authorization && authorization.split(' ')[1];

    if (key !== process.env.API_KEY) {
      return new NextResponse(
        'Tarvitset api-avaimen käyttääksesi /api/admin sijainnissa olevia reittejä.',
        {
          status: 401,
          statusText: 'Kielletty.',
        }
      );
    }
  } else if (pathname.startsWith('/api/public')) {
    return NextResponse.next();
  } else if (pathname.startsWith('/api') || pathname.startsWith('/newDashboard')) {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.redirect(`${process.env.SERVICE_DOMAIN}/login`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/newDashboard/:path*', '/api/protected/:path*', '/api/admin/:path*'],
};
