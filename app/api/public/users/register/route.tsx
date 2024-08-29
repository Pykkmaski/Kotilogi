import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import bcrypt from 'bcrypt';
import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { sendAccountActivationLink } from '@/app/api/_lib/sendAccountActivationLink';

export async function POST(req: NextRequest) {
  try {
    console.log('At register route');
    const data = await req.json();
    z.object({
      email: z.string().email(),
      password: z.string(),
    }).parse(data);

    const { email, password } = data;
    /**Should set the user as unconfirmed as well.  */
    await db('data_users').insert({
      email,
      password: await bcrypt.hash(password, 15),
      status: 0,
    });

    await sendAccountActivationLink(email);

    return new NextResponse(null, {
      status: 200,
      statusText: 'Käyttäjä luotu onnistuneesti!',
    });
  } catch (err) {
    return handleServerError(req, err);
  }
}
