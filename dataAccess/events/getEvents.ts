import db from 'kotilogi-app/dbconfig';
import { getEventDTO } from './util/dto';

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
