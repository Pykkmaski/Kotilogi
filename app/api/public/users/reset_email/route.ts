import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  createResponseMessage,
  handleServerError,
} from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return new NextResponse(createResponseMessage('Varmenne puuttuu!'));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.EMAIL_RESET_SECRET) as JwtPayload;
    } catch (err) {
      return new NextResponse(createResponseMessage('Varmenne on virheellinen!'));
    }

    await db('data_users').where({ id: decoded.id }).update({
      email: decoded.email,
    });

    const redirectUrl = req.nextUrl.searchParams.get('redirectUrl');
    return NextResponse.redirect(redirectUrl || '/dashboard');
  } catch (err: any) {
    return handleServerError(req, err);
  }
}
