import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';

export async function GET(req: NextRequest, { params }) {
  try {
    if (!params.token) {
      throw new Error('token_not_found');
    }

    const activationSecret = process.env.ACTIVATION_SECRET;

    var decodedToken = null;
    jwt.verify(params.token, activationSecret, (err, decoded) => {
      if (err) {
        //Throw error on invalid token.
        throw new Error('token_invalid');
      }
      decodedToken = decoded;
    });

    const usersTable = new DatabaseTable('users');

    const [{ status: userStatus }] = await usersTable.select('status', {
      email: decodedToken.email,
    });

    if (userStatus !== 'unconfirmed') {
      throw new Error('user_activated');
    }

    await usersTable.update(
      {
        status: 'active',
        activatedOn: Date.now(),
      },
      { email: decodedToken.email }
    );

    return NextResponse.redirect(process.env.SERVICE_DOMAIN + '/activated');
  } catch (err) {
    if (err.message === 'token_invalid') {
      return new NextResponse('Annettu varmenne on väärä.', {
        status: 403,
      });
    } else if (err.message === 'user_activated') {
      return new NextResponse('Käyttäjätili on jo aktivoitu!', {
        status: 409,
      });
    } else if (err.message === 'token_not_found') {
      return new NextResponse('Linkistä puuttuu varmenne!', {
        status: 400,
      });
    } else {
      console.log(err.message);
      return new NextResponse('Palvelinvirhe.', {
        status: 500,
      });
    }
  }
}
