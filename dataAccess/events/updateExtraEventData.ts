import { Knex } from 'knex';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

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
    } else if (typeData.targetId == getIdByLabel(targets, 'Salaojat')) {
      await runUpdate('data_drainageDitchEvents');
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
