import { handleServerError } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export async function GET(req: NextRequest) {
  const trx = await db.transaction();

  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return new NextResponse('Pyynnöstä puuttuu varmenne!', {
        status: 400,
      });
    }
    const [transferCode] = await trx('properties.transferCodes').where({ code: token });
    if (!transferCode) {
      return new NextResponse('Siirtopyyntöä ei ole!', { status: 404 });
    }

    if (Date.now() > new Date(transferCode).getTime()) {
      return new NextResponse(
        'Varmenne on vanhentunut! Pyydä talon nykyistä omistajaa luomaan uusi varmennelinkki.',
        { status: 410 }
      );
    }

    const session = await verifySession(req.nextUrl.toString());
    await trx('data_propertyOwners').where({ propertyId: transferCode.propertyId }).update({
      userId: session.user.id,
    });

    const [streetAddress] = await trx('properties.base')
      .where({ id: transferCode.propertyId })
      .pluck('streetAddress');

    await trx('properties.transferCodes').where({ code: token }).del();
    await trx.commit();

    //The user's dashboard is not updated afterwards. Consider moving this into a server action.
    return NextResponse.redirect(
      `${process.env.SERVICE_DOMAIN}/activated?action=property_transfer&streetAddress=${streetAddress}`
    );
  } catch (err) {
    await trx.rollback();
    return handleServerError(req, err);
  }
}

/**Creates a transfer token for a property. 
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
}*/
