import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../_utils/verifyAuthorization';
import db from 'kotilogi-app/dbconfig';
import { opendir, readFile } from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';

export async function POST(req: NextRequest) {
  const authorized = verifyAuthorization(req);
  if (!authorized) {
    return new NextResponse('Request unauthorized!', {
      status: 401,
    });
  }

  const trx = await db.transaction();

  try {
    const filestream = await opendir(uploadPath);

    let filesUpdated = 0;
    for await (const filename of filestream) {
      const buffer = await readFile(uploadPath + filename);
      await trx('data_files').where({ name: filename }).update({
        size: buffer.length,
      });
      filesUpdated++;
    }

    await trx.commit();
    return new NextResponse(`Files updated: ${filesUpdated}`, {
      status: 200,
    });
  } catch (err: any) {
    await trx.rollback();

    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
