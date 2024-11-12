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

    const url = `${process.env.SERVICE_DOMAIN}/activated?action=email_updated&new_email=${decoded.email}`;
    return NextResponse.redirect(url);
  } catch (err: any) {
    return handleServerError(req, err);
  }
}
