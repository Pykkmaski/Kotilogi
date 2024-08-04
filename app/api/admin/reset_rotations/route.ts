import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../_utils/verifyAuthorization';
import { opendir, readFile, writeFile } from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import sharp from 'sharp';

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
    let numFilesProcessed = 0;
    for await (const filename of filestream) {
      console.log(filename);
      const [type] = await trx('data_files').where({ name: filename }).pluck('type');
      console.log(type);
      if (type != 'image/jpeg') continue;

      const buffer = await readFile(uploadPath + filename);
      const outputBuffer = await sharp(buffer).rotate(0).toBuffer();
      await writeFile(uploadPath + filename, outputBuffer);
      numFilesProcessed++;
    }

    await trx.commit();
    return new NextResponse(`File rotations reset: ${numFilesProcessed}`, {
      status: 200,
    });
  } catch (err: any) {
    await trx.rollback();
    return new NextResponse(err.message, { status: 500 });
  }
}
