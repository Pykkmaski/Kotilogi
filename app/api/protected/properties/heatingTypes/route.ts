import { handleServerError } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const heatingTypes = await db('ref_heatingTypes');
    return NextResponse.json(heatingTypes);
  } catch (err) {
    return handleServerError(req, err);
  }
}
