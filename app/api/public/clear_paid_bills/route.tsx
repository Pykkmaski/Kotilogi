import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../_utils/verifyAuthorization';
import db from 'kotilogi-app/dbconfig';

export async function POST(req: NextRequest) {
  return new NextResponse('Not implemented!', {
    status: 500,
  });
}
