import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { createObject } from '../objects';
import { EventDataType } from '../types';
import { filterValidColumns } from '../utils/filterValidColumns';
import { getTableColumns } from '../utils/getTableColumns';
import { getEventInsertObject } from './util/dto';
import { Knex } from 'knex';
import { verifyPropertyEventCount } from './util/verification';

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
        //Save heating event data.
        const { newSystemId, oldSystemId, model, brand } = extraData;
        await trx('data_baseHeatingEvents').insert({
          id: eventId,
          newSystemId,
          oldSystemId,
          model,
          brand,
        });

        const heatingTypes = await trx('ref_heatingTypes');
        if (newSystemId == getIdByLabel(heatingTypes, 'Öljy', 'name')) {
          //Oil heating event
          await trx('data_oilHeatingEvents').insert({
            id: eventId,
            vesselVolume: extraData.vesselVolume,
            location: extraData.location,
          });
        } else if (newSystemId == getIdByLabel(heatingTypes, 'Sähkö', 'name')) {
          //Electrical heating event
          await trx('data_electricHeatingEvents').insert({
            id: eventId,
            methodId: extraData.methodId,
          });
        }
      } else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Katto')) {
        //Save roof data.
        await trx('data_roofEvents').insert({ ...extraData, id: eventId });
      } else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Salaojat')) {
        //Save drainage ditch data.
        await trx('data_drainageDitchEvents').insert({ ...extraData, id: eventId });
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
