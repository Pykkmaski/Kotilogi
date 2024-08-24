import { AUploadFile } from '@/actions/files';
import { response } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { createObject, deleteObject } from 'kotilogi-app/models/objectData';
import {
  createPropertyEvent,
  getEvents,
  updatePropertyEvent,
} from 'kotilogi-app/models/propertyEventData';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import z from 'zod';

export async function GET(req: NextRequest) {
  try {
    const query = new URL(req.url).searchParams;
    const { q, ...queryObject } = searchParamsToObject(query);
    const events = await getEvents(queryObject, q);

    return response('success', JSON.stringify(events));
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data, fdata } = await req.json();

    z.object({
      parentId: z.string(),
      startTime: z.string(),
      title: z.string(),
    }).parse(data);

    await createPropertyEvent(data, async (id, trx) => {
      //Upload any files here
      if (fdata) {
        fdata.forEach(fd => {
          const f = fd.get('file');
          console.log(f.name);
        });
        throw new Error('File uploading not implemented!');
      }
    });

    revalidatePath('/newDashboard/properties/[propertyId]');
    return response('success', null, 'Tapahtuman lisäys onnistui!');
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      id: z.string(),
    }).parse(data);

    await updatePropertyEvent(data);
    return response('success', null, 'Tapahtuman päivitys onnistui!');
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const [authorId] = await db('data_objects').where({ id }).pluck('authorId');
    const session = await loadSession();

    if (session.user.id !== authorId) {
      return response('forbidden', null, 'Vain tapahtuman laatija voi poistaa sen!');
    }

    await deleteObject(id);
    return response('success', null, 'Tapahtuman poisto onnistui!');
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}
