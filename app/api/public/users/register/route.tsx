import axios from 'axios';
import { NextRequest } from 'next/server';
import z from 'zod';
import bcrypt from 'bcrypt';
import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { sendAccountActivationLink } from '@/actions/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      email: z.string().email(),
      password: z.string(),
    }).parse(data);

    const { email, password } = data;

    await sendAccountActivationLink(email);

    await db('data_users').insert({
      email,
      password: await bcrypt.hash(password, 15),
    });

    return response('success', null, 'Käyttäjä luotu onnistuneesti!');
  } catch (err) {
    return handleServerError(req, err);
  }
}
