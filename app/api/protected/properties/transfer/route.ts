import { handleServerError } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**Creates a transfer token for a property. */
export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new NextResponse('Pyynnöstä puuttuu lupa!', {
        status: 400,
      });
    }

    const propertyId = req.nextUrl.searchParams.get('propertyId');
    if (!propertyId) {
      return new NextResponse('Pyynnöstä puuttuu talon id-numero!', {
        status: 400,
      });
    }

    const session = await loadSession();
    //Verify the password of the user.
    const [{ password: encrypted }] = await db('data_users')
      .where({ id: session.user.id })
      .select('password');
    const password = authorization.split(' ')[1];
    console.log(password, encrypted);
    const passwordOk = await bcrypt.compare(password, encrypted);
    if (!passwordOk) {
      return new NextResponse('Salasana on virheellinen!', {
        status: 401,
      });
    }

    //Check that the currently logged in user is an owner of the property.
    const owners = await db('data_propertyOwners').where({ propertyId }).pluck('userId');
    if (!owners.includes(session.user.id)) {
      return new NextResponse('Vain talon omistaja voi luoda omistajuuden siirron varmenteen!', {
        status: 403,
      });
    }

    const token = jwt.sign({ propertyId }, process.env.TRANSFER_SECRET, {
      expiresIn: '24h',
    });

    return NextResponse.json(
      { token },
      {
        status: 200,
      }
    );
  } catch (err) {
    return handleServerError(req, err);
  }
}
