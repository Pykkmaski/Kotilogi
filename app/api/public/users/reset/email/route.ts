import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { response } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import axios from 'axios';
import { z } from 'zod';
import { sendEmail } from '@/actions/email/sendEmail';

export async function GET(req: NextRequest) {}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      token: z.string(),
      email: z.string().email(),
    }).parse(data);

    const { email, token } = data;

    const decoded = jwt.verify(token, process.env.EMAIL_RESET_SECRET) as JwtPayload;
    if (!decoded) {
      return response('unauthorized', 'Varmenne on virheellinen!');
    }

    await db('data_users').where({ id: decoded.id }).update({
      email,
    });

    const redirectUrl = req.nextUrl.searchParams.get('redirectUrl');
    return NextResponse.redirect(redirectUrl || '/');
  } catch (err: any) {
    const msg = err.message;
    console.log(`/api/protected/users/reset_email GET: ${msg}`);
    return response('serverError', null, msg);
  }
}
