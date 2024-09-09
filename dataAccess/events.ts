import db from 'kotilogi-app/dbconfig';
import { EventDataType } from './types';
import { createObject, deleteObject, updateObject } from './objects';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { Knex } from 'knex';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { verifySessionUserIsAuthor } from './utils/verifySessionUserIsAuthor';

export async function getEventsOfProperty(propertyId: string, query?: string, limit: number = 10) {
  //Only allow fetching of events for owners of the property.
  const session = await loadSession();
  const [owner] = await db('data_propertyOwners').where({ propertyId, userId: session.user.id });
  if (!owner) {
    throw new Error('Vain talon omistaja voi nähdä sen tapahtumat!');
  }

  return db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .where(function () {
      if (!query) return;
      this.whereILike('data_objects.title', `%${query}%`).orWhereILike(
        'data_objects.description',
        `%${query}%`
      );
    })
    .andWhere({
      'data_objects.id': propertyId,
    })
    .limit(limit)
    .orderBy('data_objects.timestamp', 'desc');
}

export async function getEvent(id: string) {
  const event = await db('data_objects')
    .join('data_propertyEvents')
    .where({ 'data_objects.id': id });

  return event;
}

export async function createEvent(
  data: Partial<EventDataType>,
  callback?: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  await createObject(data, async (obj, trx) => {
    const eventId = obj.id;
    const insertObj = filterValidColumns(data, await getTableColumns('data_propertyEvents', trx));
    const startTime = insertObj.startTime && new Date(insertObj.startTime).getTime();
    const endTime = insertObj.endTime && new Date(insertObj.endTime).getTime();

    await trx('data_propertyEvents').insert({
      id: eventId,
      ...insertObj,
      startTime,
      endTime,
    });

    callback && (await callback(eventId, trx));
  });
}

export async function updateEvent(id: string, data: Partial<EventDataType>) {
  //Only allow the author of an event to update it.
  await verifySessionUserIsAuthor(id);

  await updateObject(id, data, async trx => {
    await trx('data_propertyEvents')
      .where({ id: data.id })
      .update({
        ...filterValidColumns(data, await getTableColumns('data_propertyEvents', trx)),
        startTime: new Date(data.startTime).getTime(),
        endTime: data.endTime && new Date(data.endTime).getTime(),
      });
  });
}

export async function deleteEvent(id: string) {
  //Only allow the author of the event to delete it.
  await verifySessionUserIsAuthor(id);
  await deleteObject(id);
}
