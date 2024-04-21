import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';

export async function GET(req: NextRequest, { params }) {
  try {
    if (!params.token) {
      throw new Error('token_not_found');
    }

    const activationSecret = process.env.ACTIVATION_SECRET;

    const emailToActivate = jwt.verify(params.token, activationSecret, (err, decoded) => {
      if (err) {
        console.log(err.message);
        //Throw error on invalid token.
        throw new Error('token_invalid');
      } else {
        return decoded;
      }
    });

    const [{ status: userStatus }] = await db('users')
      .where({ email: emailToActivate })
      .select('status');

    if (userStatus !== 'unconfirmed') {
      throw new Error('user_activated');
    }

    await db('users').where({ email: emailToActivate }).update({
      status: 'active',
      activatedOn: Date.now(),
    });

    return new NextResponse(
      'Tilisi on aktivoitu! Jos olet tällä hetkellä kirjautuneena sisään, tulee sinun kirjautua ulos, että muutokset tulevat voimaan.',
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err.message);
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
      return new NextResponse('Palvelinvirhe.', {
        status: 500,
      });
    }
  }
}
