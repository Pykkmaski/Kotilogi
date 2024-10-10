import db from 'kotilogi-app/dbconfig';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

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
    }
    if (typeData.targetId == getIdByLabel(targets, 'Salaojat')) {
      return await db('data_drainageDitchEvents').where({ id: eventId });
    } else if (typeData.targetId == getIdByLabel(targets, 'Lämmitysmuoto')) {
      const [newSystemId] = await db('data_baseHeatingEvents')
        .where({ id: eventId })
        .pluck('newSystemId');

      const heatingTypes = await db('ref_heatingTypes');

      const query = db('data_baseHeatingEvents');

      if (newSystemId == getIdByLabel(heatingTypes, 'Öljy', 'name')) {
        query.join('data_oilHeatingEvents', {
          'data_oilHeatingEvents.id': 'data_baseHeatingEvents.id',
        });
      } else if (newSystemId == getIdByLabel(heatingTypes, 'Sähkö', 'name')) {
        query.join('data_electricHeatingEvents', {
          'data_electricHeatingEvents.id': 'data_baseHeatingEvents.id',
        });
      }

      return await query.where({ 'data_baseHeatingEvents.id': eventId });
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
