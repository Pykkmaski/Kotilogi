'use server';

import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import db from 'kotilogi-app/dbconfig';
import { deleteObject } from 'kotilogi-app/models/objectData';
import {
  createPropertyEvent,
  getEvents,
  updatePropertyEvent,
} from 'kotilogi-app/models/propertyEventData';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';

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
    const data = await req.json();

    z.object({
      parentId: z.string(),
      startTime: z.string(),
      title: z.string(),
    }).parse(data);

    const propertyOwners = await db('data_propertyOwners')
      .where({ propertyId: data.parentId })
      .pluck('userId');

    const session = await loadSession();
    if (!propertyOwners.includes(session.user.id)) {
      return response('forbidden', null, 'Vain talon omistaja voi lisätä sille tapahtumia!');
    }

    await createPropertyEvent(data, async (id, trx) => {});

    await revalidatePath('/dashboard/properties/[propertyId]');
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
    await revalidatePath('/dashboard/properties/[propertyId]');
    return response('success', null, 'Tapahtuman päivitys onnistui!');
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const eventId = req.nextUrl.searchParams.get('id');
    const [authorId] = await db('data_objects').where({ id: eventId }).pluck('authorId');
    const session = await loadSession();

    if (session.user.id !== authorId) {
      return response('forbidden', null, 'Vain tapahtuman laatija voi poistaa sen!');
    }

    await deleteObject(eventId);
    await revalidatePath('/dashboard/properties/[property_id]/events');
    return response('success', null, 'Tapahtuman poisto onnistui!');
  } catch (err: any) {
    return handleServerError(req, err);
  }
}
