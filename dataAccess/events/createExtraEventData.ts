import { Knex } from 'knex';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

async function createHeatingEventData(eventId: string, extraData: any[], trx: Knex.Transaction) {
  const [data] = extraData;
  const { newSystemId } = data;
  const heatingTypes = await trx('ref_heatingTypes');
  if (newSystemId == getIdByLabel(heatingTypes, 'Öljy', 'name')) {
    //Oil heating event
    await trx('data_oilHeatingEvents').insert({
      id: eventId,
      vesselVolume: data.vesselVolume,
      location: data.location,
    });
  } else if (newSystemId == getIdByLabel(heatingTypes, 'Sähkö', 'name')) {
    //Electrical heating event
    await trx('data_electricHeatingEvents').insert({
      id: eventId,
      methodId: data.methodId,
    });
  }
}

async function createMainRenovationData(
  eventId: string,
  extraData: TODO[],
  typeData: TODO,
  trx: Knex.Transaction
) {
  //Save the extra data based on the target.
  const mainRenovationTargets = await trx('map_workTargetsToMainEventType')
    .join('ref_eventTargets', {
      'ref_eventTargets.id': 'map_workTargetsToMainEventType.targetId',
    })
    .select('ref_eventTargets.*');

  const runBaseInsert = async (tablename: string) => {
    const [data] = extraData;
    await trx(tablename).insert({ ...data, id: eventId });
  };

  //Lämmitysmuoto
  if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Lämmitysmuoto')) {
    //Save heating event data.
    await runBaseInsert('data_baseHeatingEvents');
    await createHeatingEventData(eventId, extraData, trx);
  }
  //Katto
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Katto')) {
    //Save roof data.
    await runBaseInsert('data_roofEvents');
  }
  //Salaojat
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Salaojat')) {
    //Save drainage ditch data.
    await runBaseInsert('data_drainageDitchEvents');
  }
  //Käyttövesiputket
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Käyttövesiputket')) {
    await runBaseInsert('data_kayttoVesiPutketEvents');
  }
  //Viemäriputket
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Viemäriputket')) {
    await runBaseInsert('data_viemariPutketEvents');
  }
  //Eristys
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Eristys')) {
    await runBaseInsert('data_eristeEvents');
  }
  //Sähköt
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Sähköt')) {
    await runBaseInsert('data_electricityEvents');
  }
  //Lukitus
  else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Lukitus')) {
    await runBaseInsert('data_lockEvents');
  } else {
    console.log(
      `Received an event with target id ${typeData.targetId}, but no logic for inserting extra data for that id exists. Make sure this is intentional.`
    );
  }
}

export async function createExtraEventData(
  eventId: string,
  extraData: any[],
  typeData: { mainTypeId: number; targetId: number; workTypeId?: number },
  selectedSurfaceIds: number[],
  trx: Knex.Transaction
) {
  /**The id for Peruskorjaus */
  const [mainRenovationId] = await trx('ref_mainEventTypes')
    .where({ label: 'Peruskorjaus' })
    .pluck('id');

  const [surfaceRenovationId] = await trx('ref_mainEventTypes')
    .where({ label: 'Pintaremontti' })
    .pluck('id');

  if (typeData.mainTypeId == mainRenovationId) {
    await createMainRenovationData(eventId, extraData, typeData, trx);
  } else if (typeData.mainTypeId == surfaceRenovationId) {
    //Save the surfaces.
    for (const s of selectedSurfaceIds) {
      await trx('data_surfaces').insert({
        eventId,
        s,
      });
    }
    //throw new Error('Surface save-logic not implemented!');
  }
}
