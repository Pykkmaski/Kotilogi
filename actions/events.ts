'use server';

import db from 'kotilogi-app/dbconfig';
import { uploadFiles } from 'kotilogi-app/models/files';
import { deleteObject, updateObject } from 'kotilogi-app/models/objectData';
import { createPropertyEvent, updatePropertyEvent } from 'kotilogi-app/models/propertyEventData';
import { EventDataType } from 'kotilogi-app/models/types';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import { ServerActionResponse } from './lib/ServerActionResponse';
import { isDateValue } from 'kotilogi-app/utils/isDateValue';

const path = '/newDashboard/properties';

export async function AGetEventData(query) {
  return await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where(query);
}

export async function ACreatePropertyEvent(
  data: EventDataType & Required<Pick<EventDataType, 'parentId'>>
): Promise<ServerActionResponse> {
  try {
    await createPropertyEvent(data);
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      statusText: err.message,
    };
  }

  revalidatePath(path);
  return {
    status: 200,
    statusText: 'Tapahtuma luotu!',
  };
}

export async function AUpdatePropertyEvent(
  id: string,
  data: Partial<EventDataType>
): Promise<ServerActionResponse> {
  try {
    await updateObject({ id, ...data }, async trx => {
      const updateObject = filterValidColumns(
        data,
        await getTableColumns('data_propertyEvents', trx)
      );

      const startTime = data.startTime && new Date(data.startTime).getTime();
      const endTime = data.endTime && new Date(data.endTime).getTime();

      await trx('data_propertyEvents')
        .where({ id: updateObject.id })
        .update({
          ...updateObject,
          startTime,
          endTime,
        });
    });
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      statusText: err.message,
    };
  }

  revalidatePath(path);
  return {
    status: 200,
    statusText: 'Tapahtuma päivitetty!',
  };
}

export async function ADeletePropertyEvent(id: string) {
  const session = await loadSession();
  const [authorId] = await db('data_objects').where({ id }).pluck('authorId');
  if (session.user.id != authorId)
    return {
      status: 403,
      statusText: 'Vain tapahtuman laatija voi poistaa sen!',
    };

  try {
    await deleteObject(id);
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      statusText: err.message,
    };
  }

  revalidatePath(path);
  return {
    status: 200,
    statusText: 'Tapahtuma poistettu!',
  };
}
