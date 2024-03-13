import { getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import {NextRequestWithAuth, withAuth} from 'next-auth/middleware';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';
import { options } from './app/api/auth/[...nextauth]/options';

function handleAuthorized(token: JWT, req: NextRequestWithAuth){
   if(token.status === 'unconfirmed'){
      const url = req.nextUrl.clone();
      url.pathname = '/user/confirm_email';
      return NextResponse.redirect(url);
   }
   else if(token.status === 'inactive'){
      //Redirect to the user inactive page.
      const url = req.nextUrl.clone();
      url.pathname = '/user/inactive';

      return NextResponse.redirect(url);
   }
   else if(token.status === 'unpaid'){
      const url = req.nextUrl.clone();
      url.pathname = '/user/unpaid';
      
      return NextResponse.redirect(url);
   }
}


async function middleware(req: NextRequestWithAuth){
   const {token} = req.nextauth;

   if(token){
      return handleAuthorized(token, req);
   } 
}

export default withAuth(
   middleware
)


export const config= {
   matcher: ["/dashboard/:path*", "/properties/:path*", "/events/:path*"],
}