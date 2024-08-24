import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import z from 'zod';
import { sendEmail } from '@/actions/email/sendEmail';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    const [userId] = await db('data_users').where({ email }).pluck('id');
    const token = jwt.sign(userId, process.env.PASSWORD_RESET_SECRET, {
      expiresIn: '12h',
    });

    const resetLink = `${process.env.SERVICE_DOMAIN}/reset/password?token=${token}`;
    await sendEmail('Sähköpostiosoitteen vaihto', 'Kotidok', email, resetLink);
    return response('success', null, 'Salasanan nollauslinkki lähetetty!');
  } catch (err) {
    return handleServerError(err, '/api/public/users/reset/password', 'GET');
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      token: z.string(),
      password: z.string(),
    }).parse(data);

    const { token, password } = data;

    const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET) as JwtPayload;
    if (!decoded) {
      return response('unauthorized', 'Varmenne on virheellinen!');
    }

    await db('data_users')
      .where({ id: decoded.id })
      .update({
        password: await bcrypt.hash(password, 15),
      });

    const returnUrl = req.nextUrl.searchParams.get('returnUrl');
    return NextResponse.redirect(returnUrl || '/login');
  } catch (err) {
    return handleServerError(err, '/api/public/users/reset/password', 'POST');
  }
}
