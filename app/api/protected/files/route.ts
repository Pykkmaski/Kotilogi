import db from 'kotilogi-app/dbconfig';
import { readFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { handleServerError, response } from '../../_utils/responseUtils';
import { deleteObject } from 'kotilogi-app/dataAccess/objects';

import { setDefaultMainImage, uploadFiles } from 'kotilogi-app/dataAccess/files';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
  try {
    const fileId = req.nextUrl.searchParams.get('id');
    const [filename] = await db('data_files').where({ id: fileId }).pluck('name');
    if (!filename) {
      return response('not_found', `Tiedostoa tunnukella ${fileId} ei löytynyt!`);
    } else {
      const fileBuffer = await readFile(uploadPath + filename);
      return response('success', fileBuffer);
    }
  } catch (err) {
    return handleServerError(req, err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file') as unknown as File;
    const parentId = data.get('parentId') as string;

    if (!parentId) {
      return response('bad_request', null, 'Pynnöstä puuttuu tiedostojen omistaja!');
    }

    if (!file) {
      return response('bad_request', null, 'Pyynnöstä puuttuu tiedostot!');
    }

    await uploadFiles([file], parentId);
    await setDefaultMainImage(parentId);
    revalidatePath('/dashboard');
    return response('success', null, 'Tiedostot lisätty onnistuneesti!');
  } catch (err) {
    return handleServerError(req, err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const fileId = req.nextUrl.searchParams.get('id');
    const [filename] = await db('data_files').where({ id: fileId }).pluck('name');

    await deleteObject(fileId, async trx => {
      await unlink(uploadPath + filename);
    });

    revalidatePath('/dashboard');
    return response('success', null, 'Tiedosto poistettu!');
  } catch (err) {
    return handleServerError(req, err);
  }
}
