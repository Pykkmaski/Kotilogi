import db from 'kotilogi-app/dbconfig';
import { EventDataType } from './types';
import { batchUpdateObjects, createObject, deleteObject, updateObject } from './objects';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { Knex } from 'knex';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { verifySessionUserIsAuthor } from './utils/verifySessionUserIsAuthor';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

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

/**
 * Creates a data-transform-object of an event. Creates a title based on the types of an event, if an actual title is not defined.
 * @param eventData
 * @returns
 */
const getEventDTO = (eventData: TODO) => {
  const labels = [eventData.mainTypeLabel, eventData.targetLabel, eventData.workTypeLabel].filter(
    t => t != null
  );

  const title = labels.length ? labels.join(' - ') : eventData.title || 'Ei Otsikkoa.';

  return {
    id: eventData.id,
    parentId: eventData.parentId,
    title,
    description: eventData.description,
    date: eventData.date,
    mainTypeLabel: eventData.mainTypeLabel,
    targetLabel: eventData.targetLabel,
    workTypeLabel: eventData.workTypeLabel,
    mainTypeId: eventData.mainTypeId,
    targetId: eventData.targetId,
    workTypeId: eventData.workTypeId,
  };
};

/**
 * @deprecated
 * @returns
 */
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

/**
 * Fetches events from the database.
 * @param query The knex query-object to use.
 * @param search An optional search-string with which to filter the results based on the title, description, main type, target or work type labels.
 * @param limit An optional limit to how many results are returned. Defaults to 10.
 * @param page An optional page number to offset the results by. Defaults to 0 (The first page).
 * @returns
 */
export const getEvents = async (
  query: TODO,
  search?: string,
  limit: number = 10,
  page: number = 0
) => {
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

    .select(
      'data_objects.*',
      'data_propertyEvents.*',
      'ref_eventTargets.label as targetLabel',
      'ref_eventWorkTypes.label as workTypeLabel',
      'ref_mainEventTypes.label as mainTypeLabel'
    )
    .where(function () {
      if (!search) return;
      const q = `%${search}%`;
      this.whereILike('data_objects.title', q)
        .orWhereILike('data_objects.description', q)
        .orWhereILike('ref_mainEventTypes.label', q)
        .orWhereILike('ref_eventTargets.label', q)
        .orWhereILike('ref_eventWorkTypes.label', q);
    })
    .andWhere(newQuery)
    .limit(limit)
    .offset(page * limit)
    .orderBy('data_propertyEvents.date', 'desc');

  return events
    .filter(e => {
      return (
        e.workTypeLabel?.includes(search) ||
        e.mainTypeLabel?.includes(search) ||
        e.targetLabel?.includes(search) ||
        true
      );
    })
    .map(e => getEventDTO(e));
};

/**Fetches the additional data associated with an event
 * @param eventId The id of the event to fetch additional data for.
 * @returns An array containing the extra data.
 * @throws An error if the event has a main type, or target id, for which no functionality is implemented yet.
 */
export const getExtraEventData = async (eventId: string) => {
  const [typeData] = await db('data_propertyEvents')
    .where({ id: eventId })
    .select('mainTypeId', 'targetId', 'workTypeId');
  const mainTypes = await db('ref_mainEventTypes');

  if (typeData.mainTypeId == getIdByLabel(mainTypes, 'Peruskorjaus')) {
    const targets = await db('ref_eventTargets');
    if (typeData.targetId == getIdByLabel(targets, 'Katto')) {
      return await db('data_roofEvents').where({ id: eventId });
    } else {
      throw new Error(
        'Extra data read logic for event with target ' + typeData.targetId + ' not implemented!'
      );
    }
  } else {
    throw new Error(
      'Extra data read logic not implemented for main type id ' + typeData.mainTypeId
    );
  }
};

/**Throws an error if the user already has the maximum number of allowed events for a property. */
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
    .where({ 'data_propertyEvents.id': eventId })
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

/**Creates a new event for a property.
 * @param mainData The main event data, containing its title, description, etc.
 * @param typeData The data containing the main type id, id of the target the event refers to, and optionally the id of the work type.
 * @param extraData The additional data to include with the main data.
 * @param selectedSurfaceIds The ids of the surfaces the event refers to. Used only for surface renovation events (Pintaremontti).
 * @param callback An optional callback function to run before commiting the data.
 */
export async function createEvent(
  mainData: Partial<EventDataType> & Required<Pick<EventDataType, 'parentId'>>,
  typeData: {
    mainTypeId: number;
    targetId: number;
    workTypeId?: number;
  },
  extraData: any,
  selectedSurfaceIds: number[],
  callback?: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  await verifyPropertyEventCount(mainData.parentId);

  await createObject(mainData, async (obj, trx) => {
    const eventId = obj.id;
    const eventData = getEventInsertObject({
      ...filterValidColumns(
        { ...mainData, ...typeData },
        await getTableColumns('data_propertyEvents', trx)
      ),
      id: eventId,
    });

    //Save the main event data.
    await trx('data_propertyEvents').insert(eventData);

    //Create the additional data entries.

    const [mainRenovationId] = await trx('ref_mainEventTypes')
      .where({ label: 'Peruskorjaus' })
      .pluck('id');

    const [maintenanceRenovationId] = await trx('ref_mainEventTypes')
      .where({ label: 'Huoltotyö' })
      .pluck('id');

    const [surfaceRenovationId] = await trx('ref_mainEventTypes')
      .where({ label: 'Pintaremontti' })
      .pluck('id');

    if (typeData.mainTypeId == mainRenovationId) {
      //Save the extra data based on the target.
      const mainRenovationTargets = await trx('map_workTargetsToMainEventType')
        .join('ref_eventTargets', {
          'ref_eventTargets.id': 'map_workTargetsToMainEventType.targetId',
        })
        .select('ref_eventTargets.*');

      if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Lämmitysmuoto')) {
        //Save heating method data.
        throw new Error('Saving logic for heating renovation event not implemented!');
      } else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Katto')) {
        //Save roof data.

        await trx('data_roofEvents').insert({ ...extraData, id: eventId });
      } else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Salaojat')) {
        //Save drainage ditch data.
        throw new Error('Saving logic for drainage ditch renovation event not implemented!');
      } else {
        throw new Error('Unsupported targetId ' + typeData.targetId);
      }
    } else if (typeData.mainTypeId == maintenanceRenovationId) {
      throw new Error('Logic for maintenance event types not implemented!');
    } else if (typeData.mainTypeId == surfaceRenovationId) {
      //Save the surfaces.
      throw new Error('Logic for surface events types not implemented!');
    }
    callback && (await callback(eventId, trx));
  });
}

/**Updates the additional data associated with an event.
 * @param id The id of the event.
 * @param extraData The additional data to update with.
 * @param trx The knex transaction currently being used.
 */
export async function updateExtraEventData(id: string, extraData: any, trx: Knex.Transaction) {
  console.log(extraData);
  const mainTypes = await trx('ref_mainEventTypes');
  const [typeData] = await trx('data_propertyEvents')
    .where({ id })
    .select('mainTypeId', 'targetId', 'workTypeId');

  const runUpdate = async (table: string) => {
    await trx(table)
      .where({ id })
      .update({
        ...extraData,
      });
  };

  if (typeData.mainTypeId == getIdByLabel(mainTypes, 'Peruskorjaus')) {
    const targets = await trx('ref_eventTargets');
    if (typeData.targetId == getIdByLabel(targets, 'Katto')) {
      await runUpdate('data_roofEvents');
    } else {
      throw new Error(
        'Update logic for extra event data with type ' +
          typeData.mainTypeId +
          ' and target ' +
          typeData.targetId +
          ' not implemented!'
      );
    }
  } else {
    throw new Error(
      'Update logic for event with main type ' + typeData.mainTypeId + ' not implemented!'
    );
  }
}

/**Updates the main event data.
 * @param id The id of the event to update.
 * @param data The main event data to update with.
 * @param extraData An array containing the additional data associated with the event.
 */
export async function updateEvent(id: string, data: Partial<EventDataType>, extraData: any[]) {
  //Only allow the author of an event to update it.
  await verifySessionUserIsAuthor(id);

  await updateObject(id, data, async trx => {
    const insertObj = getEventInsertObject(
      filterValidColumns(data, await getTableColumns('data_propertyEvents', trx))
    );
    await trx('data_propertyEvents').where({ id: data.id }).update(insertObj);
    const extraDataPromises = extraData.map(d => updateExtraEventData(id, d, trx));
    await Promise.all(extraDataPromises);
  });
}

/**Deletes an event. Throws an error if the logged in user is not the author of the event, or if the event is locked.
 * @param id The id of the event to delete.
 */
export async function deleteEvent(id: string) {
  //Only allow the author of the event to delete it.
  await verifySessionUserIsAuthor(id);
  await verifyEventIsNotLocked(id);
  await deleteObject(id);
}
