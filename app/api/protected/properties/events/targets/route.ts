import { handleServerError } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const eventTypeId = req.nextUrl.searchParams.get('mainTypeId');
    if (!eventTypeId || eventTypeId == 'undefined') {
      return new NextResponse(null, {
        status: 400,
        statusText: 'Event type id missing from request!',
      });
    }

    const targetIds = await db('ref_eventWorkTargetCategories')
      .where({ eventMainTypeId: eventTypeId })
      .pluck('workTargetId');

    const targets = await db('ref_eventTargets').whereIn('id', targetIds);
    console.log(targets, targetIds);
    return NextResponse.json(targets);
  } catch (err) {
    return handleServerError(req, err);
  }
}
