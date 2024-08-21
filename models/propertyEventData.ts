import db from 'kotilogi-app/dbconfig';
import { EventDataType } from './types';
import { createObject, updateObject } from './objectData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { Knex } from 'knex';

export async function getEvents(queryObj: TODO, query?: string) {
  return db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .where(function () {
      if (!query) return;
      this.whereILike('data_objects.title', `%${query}%`).orWhereILike(
        'data_objects.description',
        `%${query}%`
      );
    })
    .andWhere(queryObj);
}

export async function getEventsForProperty(propertyId: string, query?: string) {
  return db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .where(function () {
      if (!query) return;
      this.whereILike('title', `%${query}%`).orWhereILike('description', `%${query}%`);
    })
    .andWhere({ 'data_objects.parentId': propertyId });
}

export async function createPropertyEvent(
  data: Partial<EventDataType>,
  callback: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  return await createObject(data, async (obj, trx) => {
    const eventId = obj.id;
    const insertObj = filterValidColumns(data, await getTableColumns('data_propertyEvents', trx));
    await trx('data_propertyEvents').insert({
      id: eventId,
      ...insertObj,
      startTime: new Date(insertObj.startTime).getTime(),
      endTime: insertObj.endTime && new Date(insertObj.endTime).getTime(),
    });

    await callback(eventId, trx);
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
