import { handleServerError } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const targetId = req.nextUrl.searchParams.get('targetId');
    console.log(targetId);
    if (!targetId || targetId == 'undefined') {
      return new NextResponse(null, {
        status: 400,
        statusText: 'Target id missing from request!',
      });
    }

    const workTypes = await db('ref_eventWorkTypes').where({ eventTargetId: targetId });
    console.log(workTypes);
    return NextResponse.json(workTypes);
  } catch (err) {
    return handleServerError(req, err);
  }
}
