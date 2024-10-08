import { NextRequest } from 'next/server';
import db from 'kotilogi-app/dbconfig';
import { response } from '../../../_utils/responseUtils';

/**Clears all users that have not activated their account within 6 months. */
export async function POST(req: NextRequest) {
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
