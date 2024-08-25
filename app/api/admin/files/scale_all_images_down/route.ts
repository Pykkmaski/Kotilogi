import { readFile, unlink, writeFile } from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { verifyAuthorization } from '../../../_utils/verifyAuthorization';
import { response } from '../../../_utils/responseUtils';

export async function POST(req: NextRequest) {
  const trx = await db.transaction();

  try {
    const filestream = await trx('data_files').stream();
    for await (const file of filestream) {
      if (file.type !== 'image/jpeg') continue;

      const filename = file.name;

      //Load the image from disk.
      const buffer = await readFile(uploadPath + filename);
      if (buffer) {
        const metadata = await sharp(buffer).metadata();

        //Resize the image and lower its quality.
        const outputBuffer =
          metadata.width > 1000
            ? await sharp(buffer).resize(1000).jpeg({ quality: 80 }).toBuffer()
            : await sharp(buffer).jpeg({ quality: 80 }).toBuffer();

        //Save the processed file.
        await writeFile(uploadPath + filename, outputBuffer);

        //Update the database entry with the new size:
        await trx('data_files').where({ id: file.id }).update({
          size: outputBuffer.length,
        });
      }
    }

    await trx.commit();
    return response('success', null);
  } catch (err: any) {
    await trx.rollback();
    console.log(err.message);
    return response('serverError', null);
  }
}
