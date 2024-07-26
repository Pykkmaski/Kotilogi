'use server';

import db from 'kotilogi-app/dbconfig';
import { createObject, deleteObject, updateObject } from 'kotilogi-app/models/objectData';
import { EventStepDataType } from 'kotilogi-app/models/types';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';

const table = 'data_propertyEventSteps';
const path = '/newDashboard/properties/[id]/events/[id]';

export async function ACreateEventStep(data: Partial<EventStepDataType>) {
  await createObject(data, async (obj, trx) => {
    const insertObj = filterValidColumns(data, await getTableColumns(table, trx));
    await trx(table).insert({
      id: obj.id,
      ...insertObj,
    });
  });
  revalidatePath(path);
  return 0;
}

export async function AUpdateEventStep(
  data: Partial<EventStepDataType> & Required<Pick<EventStepDataType, 'id'>>
) {
  await updateObject(data, async trx => {
    const insertObj = filterValidColumns(data, await getTableColumns(table, trx));
    await trx(table)
      .where({ id: data.id })
      .update({
        ...insertObj,
        time: data.time && new Date(data.time).getTime(),
      });
  });
  revalidatePath(path);
  return 0;
}

export async function ADeleteEventStep(id) {
  const session = await loadSession();
  const [authorId] = await db('data_objects').where({ id }).pluck('authorId');
  if (session.user.id != authorId) return -1;
  await deleteObject(id);
  revalidatePath(path);
  return 0;
}
