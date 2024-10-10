import { updateObject } from '../objects';
import { EventDataType } from '../types';
import { filterValidColumns } from '../utils/filterValidColumns';
import { getTableColumns } from '../utils/getTableColumns';
import { verifySessionUserIsAuthor } from '../utils/verifySessionUserIsAuthor';
import { updateExtraEventData } from './updateExtraEventData';
import { getEventInsertObject } from './util/dto';

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
