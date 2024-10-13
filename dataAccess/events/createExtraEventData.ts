import { Knex } from 'knex';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

export async function createExtraEventData(
  eventId: string,
  extraData: any,
  typeData: { mainTypeId: number; targetId: number; workTypeId?: number },
  selectedSurfaceIds: number[],
  trx: Knex.Transaction
) {
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
  } else if (typeData.mainTypeId == surfaceRenovationId) {
    //Save the surfaces.
  }
}
