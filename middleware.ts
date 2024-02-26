import { JWT } from 'next-auth/jwt';
import {NextRequestWithAuth, withAuth} from 'next-auth/middleware';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';

function handleAuthorized(token: JWT, req: NextRequestWithAuth){
   if(token.status === 'unconfirmed'){
      const url = req.nextUrl.clone();
      url.pathname = '/user/confirm_email';
      return NextResponse.redirect(url);
   }
   else if(token.trial && token.status === 'trial_expired'){
      const url = req.nextUrl.clone();
      url.pathname = '/user/trial_expired';

      return NextResponse.redirect(url);
   }
   else if(token.status === 'inactive'){
      //Redirect to the user inactive page.
      const url = req.nextUrl.clone();
      url.pathname = '/user/inactive';
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