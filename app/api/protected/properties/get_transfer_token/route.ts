import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import db from 'kotilogi-app/dbconfig';
import { response } from 'kotilogi-app/app/api/_utils/responseUtils';

/**Generates a transfer token for a given property id. */
export async function GET(req: NextRequest) {
  try {
    const propertyId = req.nextUrl.searchParams.get('id');
    const session = await loadSession();
    const owners = await db('data_propertyOwners').where({ propertyId, userId: session.user.id });

    if (!owners.length) {
      return response(
        'forbidden',
        null,
        'Vain talon omistaja voi luoda omistajuuden siirron varmenteen!'
      );
    }

    const token = jwt.sign(propertyId, process.env.TRANSFER_SECRET, {
      expiresIn: '12h',
    });
    return response('success', token);
  } catch (err) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}
