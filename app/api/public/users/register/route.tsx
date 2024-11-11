import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import {
  createResponseMessage,
  handleServerError,
} from 'kotilogi-app/app/api/_utils/responseUtils';
import { sendAccountActivationLink } from '@/app/api/_lib/sendAccountActivationLink';
import { users } from 'kotilogi-app/dataAccess/users';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      email: z.string().email(),
      password: z.string(),
    }).parse(data);

    const { email, password } = data;

    try {
      await users.create({ email, password });
    } catch (err) {
      const msg = err.message.toUpperCase();
      if (msg.includes('DUPLICATE')) {
        return new NextResponse(
          createResponseMessage('Käyttäjätili annetulla sähköpostiosoitteella on jo olemassa!'),
          {
            status: 409,
          }
        );
      } else {
        throw err;
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
