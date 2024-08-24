import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../../_utils/verifyAuthorization';
import db from 'kotilogi-app/dbconfig';
import { response } from '../../../_utils/responseUtils';

/**Clears all users that have not activated their account within 6 months. */
export async function POST(req: NextRequest) {
  const authorized = verifyAuthorization(req);
  if (!authorized) {
    return response('unauthorized', null, 'Luvaton pyyntö!');
  }

  const trx = await db.transaction();
  try {
    const stream = trx('data_users').stream();
    let usersDeleted = 0;
    for await (const user of stream) {
      if (user.status !== 'unconfirmed') {
        continue;
      }

      const userExpiryDate = new Date(user.createdAt);
      userExpiryDate.setMonth(userExpiryDate.getMonth() + 6);

      if (Date.now() >= userExpiryDate.getTime()) {
        await trx('data_users').where({ id: user.id }).del();
        usersDeleted++;
      }
    }

    await trx.commit();
    return response('success', null, `Toiminnattomia käyttäjiä poistettu ${usersDeleted}`);
  } catch (err) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}
