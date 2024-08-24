import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../_utils/verifyAuthorization';
import db from 'kotilogi-app/dbconfig';

/**Clears all users that have not activated their account within 6 months. */
export async function POST(req: NextRequest) {
  try {
    const authorized = verifyAuthorization(req);
    if (!authorized) {
      return new NextResponse('Request unauthorized!', {
        status: 401,
      });
    }

    const stream = db('users').stream();
    const usersTable = new DatabaseTable('users');

    for await (const user of stream) {
      if (user.status !== 'unconfirmed') {
        continue;
      }

      const userExpiryDate = new Date(user.createdAt);
      userExpiryDate.setMonth(userExpiryDate.getMonth() + 6);

      if (Date.now() >= userExpiryDate.getTime()) {
        await usersTable.del({ email: user.email });
      }
    }

    return new NextResponse(null, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
