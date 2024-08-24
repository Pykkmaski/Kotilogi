import { unlink } from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }) {
  const trx = await db.transaction();
  try {
    const fileId = params.file_id;
    const { fileName } = (await trx('data_files').where({ id: fileId }).select('fileName')) || {};
    await db('data_objects').where({ id: fileId }).del();

    await unlink(uploadPath + fileName);
    await trx.commit();
    return new NextResponse(null, {
      status: 200,
    });
  } catch (err: any) {
    await trx.rollback();
    console.log(err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
