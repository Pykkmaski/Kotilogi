import db from 'kotilogi-app/dbconfig';
import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { response } from '../../_utils/responseUtils';
import { deleteObject } from 'kotilogi-app/models/objectData';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const fileId = req.nextUrl.searchParams.get('id');
    const [filename] = await db('data_files').where({ id: fileId }).pluck('name');
    if (!filename) {
      return response('not_found', `Tiedostoa tunnukella ${fileId} ei löytynyt!`);
    } else {
      const fileBuffer = await readFile(uploadPath + filename);
      return new NextResponse(fileBuffer, { status: 200 });
    }
  } catch (err) {
    const msg = err.message;
    console.log(`/api/protected/files GET: ${msg}`);
    return response('serverError', null, msg);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const fileId = req.nextUrl.searchParams.get('id');
    await deleteObject(fileId);
    await axios.get('/api/public/clear_unpaired_files', {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    return new NextResponse(null, {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err, {
      status: 500,
      statusText: 'File deletion failed due to a server error.',
    });
  }
}
