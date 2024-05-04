import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';

export async function GET(req: NextRequest, { params }) {
  try {
    const token = params.token;
    if (!token) {
      throw new Error('token_not_present');
    }

    const emailResetSecret = process.env.EMAIL_RESET_SECRET;
    var decodedToken = null;
    jwt.verify(token, emailResetSecret, (err, decoded) => {
      if (err) {
        throw new Error('invalid_token');
      }

      decodedToken = decoded;
    });

    await new DatabaseTable('users').update(
      { email: decodedToken.newEmail },
      { email: decodedToken.oldEmail }
    );
    return NextResponse.redirect('/');
  } catch (err: any) {
    const msg = err.message.toLowerCase();
    if (msg === 'invalid_token') {
      return new NextResponse('Tunniste on virheellinen!', {
        status: 400,
      });
    } else if (msg == 'token_not_present') {
      return new NextResponse('Linkistä puuttuu tunniste!', {
        status: 400,
      });
    } else {
      return new NextResponse('Palvelinvirhe.', {
        status: 500,
      });
    }
  }
}
