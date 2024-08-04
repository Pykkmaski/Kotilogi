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
    for await (const file of filestream) {
      const [type] = await trx('data_files').where({ name: file.name }).pluck('type');

      if (type != 'image/jpeg') continue;

      const buffer = await readFile(uploadPath + file.name);
      const outputBuffer = await sharp(buffer).rotate(90).toBuffer();
      await writeFile(uploadPath + file.name, outputBuffer);
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
