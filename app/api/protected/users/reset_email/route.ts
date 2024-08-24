import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { response } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return response('unauthorized', 'Linkistä puuttuu varmenne!');
    }

    const emailResetSecret = process.env.EMAIL_RESET_SECRET;
    var decoded = jwt.verify(token, emailResetSecret) as JwtPayload;
    if (!decoded) {
      return response('unauthorized', 'Varmenne on virheellinen!');
    }

    const userPatchRes = await axios.patch('/api/protected/users', {
      data: {
        id: decoded.id,
        email: decoded.email,
      },
    });

    if (userPatchRes.status !== 200) {
      return new NextResponse(null, {
        status: userPatchRes.status,
        statusText: userPatchRes.statusText,
      });
    }

    const redirectUrl = req.nextUrl.searchParams.get('redirectUrl');
    return NextResponse.redirect(redirectUrl || '/');
  } catch (err: any) {
    const msg = err.message;
    console.log(`/api/protected/users/reset_email GET: ${msg}`);
    return response('serverError', null, msg);
  }
}
