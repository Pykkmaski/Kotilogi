import db from 'kotilogi-app/dbconfig';
import { EventDataType } from './types';
import { createObject, deleteObject, updateObject } from './objects';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { Knex } from 'knex';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { verifySessionUserIsAuthor } from './utils/verifySessionUserIsAuthor';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { formatDate } from 'kotilogi-app/utils/formatDate';

const getEventDTO = (eventData: TODO, mode: 'save' | 'load') => {
  if (mode == 'load') {
    return {
      ...eventData,
      labourExpenses: eventData.labourExpenses / 100,
      materialExpenses: eventData.materialExpenses / 100,
    };
  } else {
    return {
      ...eventData,
      labourExpenses: eventData.labourExpenses * 100,
      materialExpenses: eventData.materialExpenses * 100,
    };
  }
};

export const verifyPropertyEventCount = async (propertyId: string) => {
  const [{ numEvents }] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_objects.parentId': propertyId })
    .count('* as numEvents');

  if (numEvents >= 100) {
    throw new Error('Et voi lisätä talolle enempää tapahtumia!');
  }
};

/**Throws an error if the event is at least 30 days old. */
export const verifyEventIsNotLocked = async (eventId: string) => {
  const [timestamp] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ id: eventId })
    .select('data_objects.timestamp');

  const now = Date.now();
  const maxEventAge = getDaysInMilliseconds(30);
  const eventAge = now - timestamp;
  if (eventAge >= maxEventAge) {
    throw new Error(
      'Tapahtuma on vähintään 30 päivää vanha, joten sitä ei voi enää muokata tai poistaa!'
    );
  }
};

/**Returns the events of a specified property. */
export async function getEventsOfProperty(propertyId: string, query?: string, limit: number = 10) {
  //Only allow fetching of events for owners of the property.
  const session = await loadSession();
  const [owner] = await db('data_propertyOwners').where({ propertyId, userId: session.user.id });
  if (!owner) {
    throw new Error('Vain talon omistaja voi nähdä sen tapahtumat!');
  }

  const events = await db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .where(function () {
      if (!query) return;
      this.whereILike('data_objects.title', `%${query}%`).orWhereILike(
        'data_objects.description',
        `%${query}%`
      );
    })
    .andWhere({
      'data_objects.parentId': propertyId,
    })
    .limit(limit)
    .orderBy('data_propertyEvents.date', 'desc');

  return events;
}

/**Returns an event by id. */
export async function getEvent(id: string) {
  const event = await db('data_objects')
    .join('data_propertyEvents')
    .where({ 'data_objects.id': id });

  return event;
}

/**Creates a new event for a property. */
export async function createEvent(
  data: Partial<EventDataType> & Required<Pick<EventDataType, 'parentId'>>,
  callback?: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  await verifyPropertyEventCount(data.parentId);

  await createObject(data, async (obj, trx) => {
    const eventId = obj.id;
    const insertObj = filterValidColumns(data, await getTableColumns('data_propertyEvents', trx));
    console.log(insertObj);
    const eventData = {
      ...insertObj,
      id: eventId,
      workTypeId: (insertObj.workTypeId as any) == 'null' ? null : insertObj.workTypeId,
    };

    await trx('data_propertyEvents').insert(eventData);
    console.log(eventId);
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
      });
  });
}

export async function deleteEvent(id: string) {
  //Only allow the author of the event to delete it.
  await verifySessionUserIsAuthor(id);
  await verifyEventIsNotLocked(id);
  await deleteObject(id);
}
