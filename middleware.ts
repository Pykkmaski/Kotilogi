import { JWT } from 'next-auth/jwt';
import {NextRequestWithAuth, withAuth} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

function handleAuthorized(token: JWT, req: NextRequestWithAuth){
   if(token.status === 'unconfirmed'){
      const url = req.nextUrl.clone();
      url.pathname = '/user/confirm_email';
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