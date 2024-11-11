import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  createResponseMessage,
  handleServerError,
} from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      token: z.string(),
      email: z.string().email(),
    }).parse(data);

    const { email, token } = data;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.EMAIL_RESET_SECRET) as JwtPayload;
    } catch (err) {
      return new NextResponse(createResponseMessage('Varmenne on virheellinen!'));
    }

    await db('data_users').where({ id: decoded.id }).update({
      email,
    });

    const redirectUrl = req.nextUrl.searchParams.get('redirectUrl');
    return NextResponse.redirect(redirectUrl || '/');
  } catch (err: any) {
    return handleServerError(req, err);
  }
}
