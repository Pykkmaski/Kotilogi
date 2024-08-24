import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import { response } from 'kotilogi-app/app/api/_utils/responseUtils';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return response('unauthorized', 'Linkistä puuttuu varmenne!');
    }

    const activationSecret = process.env.ACTIVATION_SECRET;

    var decodedToken = null;

    jwt.verify(token, activationSecret, async (err, decoded) => {
      if (err) {
        return response('unauthorized', 'Varmenne on virheellinen!');
      }

      decodedToken = decoded;

      const [{ status: userStatus }] = await db('data_users').select('status', {
        email: decodedToken.email,
      });

      if (userStatus !== 'unconfirmed') {
        return response('conflict', 'Käyttäjätili on jo käytössä!');
      }

      await db('data_users').where({ email: decodedToken.email }).update({
        status: 'active',
        activatedOn: Date.now(),
      });
    });

    return NextResponse.redirect(process.env.SERVICE_DOMAIN + '/activated');
  } catch (err) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}
