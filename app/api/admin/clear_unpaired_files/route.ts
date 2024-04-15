import { opendir, readdir, unlink } from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyAuthorization } from '../_utils/verifyAuthorization';
import { Files } from 'kotilogi-app/utils/files';

/**
 * An api route to clean up any files that don't have a database entry.
 * @param req
 */
export async function POST(req: NextRequest) {
  try {
    const authorized = verifyAuthorization(req);
    if (!authorized) {
      return new NextResponse('Request unauthorized!', {
        status: 401,
      });
    }

    const filesDeleted = await Files.removeUnpaired();

    return new NextResponse(`Unpaired files deleted: ${filesDeleted}`, {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
