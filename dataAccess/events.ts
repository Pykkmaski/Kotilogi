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

/**
 * Prepares event data for insertion into the db.
 * @param data
 * @returns
 */
const getEventInsertObject = (data: TODO) => {
  return {
    ...data,
    workTypeId: (data.workTypeId as any) == -1 ? null : data.workTypeId,
    targetId: (data.targetId as any) == -1 ? null : data.targetId,
  };
};

const getEventDTO = (eventData: TODO) => {
  return {
    id: eventData.id,
    parentId: eventData.parentId,
    title:
      eventData.title ||
      `${eventData.mainTypeLabel} - ${eventData.targetLabel} - ${eventData.workTypeLabel}`,
    description: eventData.description,
    date: eventData.date,
    mainTypeLabel: eventData.mainTypeLabel,
    targetLabel: eventData.targetLabel,
    workTypeLabel: eventData.workTypeLabel,
  };
};

const getBaseEventQuery = () => {
  return db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .join('ref_eventTargets', { 'ref_eventTargets.id': 'data_propertyEvents.targetId' })
    .join('ref_eventWorkTypes', { 'ref_eventWorkTypes.id': 'data_propertyEvents.workTypeId' })
    .join('ref_mainEventTypes', {
      'ref_mainEventTypes.id': 'data_propertyEvents.mainTypeId',
    })
    .select(
      'data_objects.*',
      'data_propertyEvents.*',
      'ref_eventTargets.label as targetLabel',
      'ref_eventWorkTypes.label as workTypeLabel',
      'ref_mainEventTypes.label as mainTypeLabel'
    );
};

export const getEvents = async (query: TODO, search?: string, limit: number = 10) => {
  const newQuery = {
    ...query,
  };

  if (query.id) {
    newQuery['data_objects.id'] = query.id;
  }

  delete newQuery.id;

  const events = await db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .leftJoin('ref_eventTargets', { 'data_propertyEvents.targetId': 'ref_eventTargets.id' })
    .leftJoin('ref_eventWorkTypes', { 'data_propertyEvents.workTypeId': 'ref_eventWorkTypes.id' })
    .leftJoin('ref_mainEventTypes', {
      'data_propertyEvents.mainTypeId': 'ref_mainEventTypes.id',
    })
    .where(function () {
      if (!search) return;
      const q = `%${search}%`;
      this.whereILike('data_objects.title', q)
        .orWhereILike('data_objects.description', q)
        .orWhereILike('data_propertyEvents.date', q);
    })
    .andWhere(newQuery)
    .limit(limit)
    .orderBy('data_propertyEvents.date', 'desc')
    .select(
      'data_objects.*',
      'data_propertyEvents.*',
      'ref_eventTargets.label as targetLabel',
      'ref_eventWorkTypes.label as workTypeLabel',
      'ref_mainEventTypes.label as mainTypeLabel'
    );

  return events.map(e => getEventDTO(e));
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

/**Returns the events of a specified property.
 * @deprecated
 */
export async function getEventsOfProperty(propertyId: string, query?: string, limit: number = 10) {
  //Only allow fetching of events for owners of the property.
  const session = await loadSession();
  const [owner] = await db('data_propertyOwners').where({ propertyId, userId: session.user.id });
  if (!owner) {
    throw new Error('Vain talon omistaja voi nähdä sen tapahtumat!');
  }

  const events = await getBaseEventQuery()
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

  return events.map(e => getEventDTO(e));
}

/**Returns an event by id.
 * @deprecated
 */
export async function getEvent(id: string) {
  return await getBaseEventQuery().where({ 'data_objects.id': id });
}

/**Creates a new event for a property. */
export async function createEvent(
  data: Partial<EventDataType> & Required<Pick<EventDataType, 'parentId'>>,
  callback?: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  await verifyPropertyEventCount(data.parentId);

  await createObject(data, async (obj, trx) => {
    const eventId = obj.id;

    const eventData = getEventInsertObject({
      ...filterValidColumns(data, await getTableColumns('data_propertyEvents', trx)),
      id: eventId,
    });

    await trx('data_propertyEvents').insert(eventData);
    console.log(eventId);
    callback && (await callback(eventId, trx));
  });
}

export async function updateEvent(id: string, data: Partial<EventDataType>) {
  //Only allow the author of an event to update it.
  await verifySessionUserIsAuthor(id);

  await updateObject(id, data, async trx => {
    const insertObj = getEventInsertObject(
      filterValidColumns(data, await getTableColumns('data_propertyEvents', trx))
    );
    await trx('data_propertyEvents').where({ id: data.id }).update(insertObj);
  });
}

export async function deleteEvent(id: string) {
  //Only allow the author of the event to delete it.
  await verifySessionUserIsAuthor(id);
  await verifyEventIsNotLocked(id);
  await deleteObject(id);
}
