'use server';

import db from 'kotilogi-app/dbconfig';
import { deleteObject, updateObject } from 'kotilogi-app/models/objectData';
import { createPropertyEvent, updatePropertyEvent } from 'kotilogi-app/models/propertyEventData';
import { EventDataType } from 'kotilogi-app/models/types';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';

const path = '/newDashboard/properties';

export async function AGetEventData(query) {
  return await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where(query);
}

export async function ACreatePropertyEvent(
  data: EventDataType & Required<Pick<EventDataType, 'parentId'>>
) {
  await createPropertyEvent(data);
  revalidatePath(path);
  return 0;
}

export async function AUpdatePropertyEvent(
  data: EventDataType & Required<Pick<EventDataType, 'id'>>
) {
  await updateObject(data, async trx => {
    const updateObject = filterValidColumns(
      data,
      await getTableColumns('data_propertyEvents', trx)
    );
    await trx('data_propertyEvents')
      .where({ id: updateObject.id })
      .update({
        ...updateObject,
        startTime: new Date(updateObject.startTime).getTime(),
        endTime: updateObject.endTime && new Date(updateObject.endTime).getTime(),
      });
  });

  revalidatePath(path);
  return 0;
}

export async function ADeletePropertyEvent(id: string) {
  const session = await loadSession();
  const [authorId] = await db('data_objects').where({ id }).pluck('authorId');
  if (session.user.id != authorId) return -1;
  await deleteObject(id);
  revalidatePath(path);
  return 0;
}
