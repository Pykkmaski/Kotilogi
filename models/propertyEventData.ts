import db from 'kotilogi-app/dbconfig';
import { EventDataType } from './types';
import { createObject, updateObject } from './objectData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

export async function getEvents(propertyId: string) {
  return db('data_objects')
    .where({ 'data_objects.parentId': propertyId })
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' });
}

export async function createPropertyEvent(data: Partial<EventDataType>) {
  return await createObject(data, async (obj, trx) => {
    const insertObj = filterValidColumns(data, await getTableColumns('data_propertyEvents', trx));
    await trx('data_propertyEvents').insert({
      id: obj.id,
      ...insertObj,
      startTime: new Date(insertObj.startTime).getTime(),
      endTime: insertObj.endTime && new Date(insertObj.endTime).getTime(),
    });
  });
}

export async function updatePropertyEvent(data: Partial<EventDataType>) {
  return await updateObject(data, async trx => {
    await trx('data_propertyEvents')
      .where({ id: data.id })
      .update({
        ...filterValidColumns(data, await getTableColumns('data_propertyEvents', trx)),
        startTime: new Date(data.startTime).getTime(),
        endTime: data.endTime && new Date(data.endTime).getTime(),
      });
  });
}
