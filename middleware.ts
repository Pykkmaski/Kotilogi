import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const ipMap = new Map<string, { count: number; lastReset: number }>();

const rateLimiter = (req: NextRequestWithAuth) => {
  const ip = req.headers.get('X-Forwarded-For');
  const ipData = ipMap.get(ip);

  if (ipData) {
    if (Date.now() - ipData.lastReset > 1000 * 60 * 30) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= 10) {
      return new NextResponse('Too many requests.', {
        status: 401,
      });
    }

    ipData.count++;
  } else {
    ipMap.set(ip, {
      count: 1,
      lastReset: Date.now(),
    });
  }
};

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
  } else if (pathname.startsWith('/api/public')) {
    return rateLimiter(req);
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
  matcher: [
    '/api/public/users/activate/send',
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/api/admin/:path*',
  ],
};
