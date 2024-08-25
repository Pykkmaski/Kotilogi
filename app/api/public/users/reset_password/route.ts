import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import z from 'zod';
import { sendEmail } from 'kotilogi-app/app/api/_lib/sendEmail';
require('dotenv').config();

/**Generates a reset-token.*/
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    const [userId] = await db('data_users').where({ email }).pluck('id');

    const token = jwt.sign({ id: userId }, process.env.PASSWORD_RESET_SECRET, {
      expiresIn: 30 * 60,
    });

    const resetLink = `${process.env.SERVICE_DOMAIN}/login/reset?token=${token}`;
    await sendEmail('Sähköpostiosoitteen vaihto', 'Kotidok', email, resetLink);
    return response(
      'success',
      'Salasanan nollauslinkki lähetetty!',
      'Salasanan nollauslinkki lähetetty!'
    );
  } catch (err) {
    return handleServerError(req, err);
  }
}

/**Route called when the user confirms their new password. */
export async function POST(req: NextRequest) {
  try {
    //Get the authorization token encoding the user's id.

    const auth = req.headers.get('Authorization');
    const token = auth && auth.split(' ')[1];

    if (!token) {
      return response('unauthorized', null, 'Varmenne vaaditaan!');
    }

    const data = await req.json();
    z.object({
      password: z.string(),
    }).parse(data);

    const { password } = data;

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET) as JwtPayload;
    } catch (err) {
      console.log('Invalid token');
      return response('unauthorized', null, 'Varmenne on virheellinen!');
    }

    await db('data_users')
      .where({ id: decoded.id })
      .update({
        password: await bcrypt.hash(password, 15),
      });

    return response('success', 'Salasanan vaihto onnistui!');
  } catch (err) {
    return handleServerError(req, err);
  }
}
