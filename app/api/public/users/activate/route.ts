import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';

/**Route accessed via the link sent to a users email. */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return response('unauthorized', 'Linkistä puuttuu varmenne!');
    }

    const activationSecret = process.env.ACTIVATION_SECRET;

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, activationSecret) as JwtPayload;
    } catch (err) {
      return response('unauthorized', 'Varmenne on virheellinen!');
    }

    const [userStatus] = await db('data_users').where({ id: decoded.id }).pluck('status');

    if (userStatus !== 'unconfirmed') {
      return response('conflict', 'Käyttäjätili on jo käytössä!');
    }

    await db('data_users').where({ id: decoded.id }).update({
      status: 'active',
      activatedOn: Date.now(),
    });

    return NextResponse.redirect(process.env.SERVICE_DOMAIN + '/activated');
  } catch (err) {
    return handleServerError(req, err);
  }
}