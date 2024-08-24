import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../_utils/verifyAuthorization';
import db from 'kotilogi-app/dbconfig';

export async function GET(req: NextRequest) {
  try {
    const authorized = verifyAuthorization(req);
    if (!authorized) {
      throw new Error('Unauthorized!');
    }
    const users = await db('users').select('email');
    return new NextResponse(JSON.stringify(users, null, 1), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
