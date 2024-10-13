import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { createObject } from '../objects';
import { EventDataType } from '../types';
import { filterValidColumns } from '../utils/filterValidColumns';
import { getTableColumns } from '../utils/getTableColumns';
import { getEventInsertObject } from './util/dto';
import { Knex } from 'knex';
import { verifyPropertyEventCount } from './util/verification';
import { createExtraEventData } from './createExtraEventData';

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
    await createExtraEventData(eventId, extraData, typeData, selectedSurfaceIds, trx);
    callback && (await callback(eventId, trx));
  });
}
