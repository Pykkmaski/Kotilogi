import { readFile, unlink, writeFile } from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(req: NextRequest) {
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

        //Delete the old file.
        await unlink(uploadPath + filename);

        //Save the processed file.
        await writeFile(uploadPath + filename, outputBuffer);

        //Update the database entry with the new size:
        await trx('data_files').where({ id: file.id }).update({
          size: outputBuffer.length,
        });
      }
    }

    await trx.commit();
    return new NextResponse(null, {
      status: 200,
    });
  } catch (err: any) {
    await trx.rollback();
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
