import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { response } from 'kotilogi-app/app/api/_utils/responseUtils';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return response('unauthorized', 'Linkistä puuttuu varmenne!');
    }

    const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET) as JwtPayload;
    if (!decoded) {
      return response('unauthorized', 'Varmenne on virheellinen!');
    }

    const userPatchRes = await axios.patch('/api/users', {
      data: {
        id: decoded.id,
        password: await bcrypt.hash(decoded.password, 15),
      },
    });

    if (userPatchRes.status !== 200) {
      return new NextResponse(null, {
        status: userPatchRes.status,
        statusText: userPatchRes.statusText,
      });
    }

    const returnUrl = req.nextUrl.searchParams.get('returnUrl');
    return NextResponse.redirect(returnUrl || '/login');
  } catch (err) {
    const msg = err.message;
    console.log(`/api/protected/users/reset_password GET: ${msg}`);
    return response('serverError', null, msg);
  }
}
