import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../../_utils/verifyAuthorization';
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

  try {
    const { fileId, amount } = await req.json();
    const [filename] = (await db('data_files').where({ id: fileId }).pluck('name')) || [];
    if (!filename) throw new Error('A file with id ' + fileId + ' was not found!');
    const buffer = await readFile(uploadPath + filename);
    const outputBuffer = await sharp(buffer).rotate(parseFloat(amount)).toBuffer();
    await writeFile(uploadPath + filename, outputBuffer);

    return new NextResponse(null, {
      status: 200,
    });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}
