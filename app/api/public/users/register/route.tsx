import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import bcrypt from 'bcrypt';
import {
  createResponseMessage,
  handleServerError,
  response,
} from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { sendAccountActivationLink } from '@/app/api/_lib/sendAccountActivationLink';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      email: z.string().email(),
      password: z.string(),
    }).parse(data);

    const { email, password } = data;

    try {
      await db('data_users').insert({
        email,
        password: await bcrypt.hash(password, 15),
        status: 0, //Unconfirmed-status,
      });
    } catch (err) {
      const msg = err.message.toUpperCase();
      if (msg.includes('DUPLICATE')) {
        return new NextResponse(
          createResponseMessage('Käyttäjätili annetulla sähköpostiosoitteella on jo olemassa!'),
          {
            status: 409,
          }
        );
      }
    }

    await sendAccountActivationLink(email);

    return new NextResponse(createResponseMessage('Käyttäjätili rekisteröity!'), {
      status: 200,
    });
  } catch (err) {
    return handleServerError(req, err);
  }
}
