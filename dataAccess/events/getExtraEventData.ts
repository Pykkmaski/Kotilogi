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
      return await db('data_roofEvents')
        .join('ref_roofTypes', { 'ref_roofTypes.id': 'data_roofEvents.roofTypeId' })
        .join('ref_roofMaterials', { 'ref_roofMaterials.id': 'data_roofEvents.id' })
        .where({ 'data_roofEvents.id': eventId })
        .select(
          'ref_roofMaterials.name as roofMaterialLabel',
          'ref_roofTypes.name as roofTypeLabel',
          'data_roofEvents.'
        );
    } else if (typeData.targetId == getIdByLabel(targets, 'Salaojat')) {
      return await db('data_drainageDitchEvents')
        .join('ref_drainageDitchMethods', {
          'ref_drainageDitchMethods.id': 'data_drainageDitchEvents.toteutusTapaId',
        })
        .where({ 'data_drainageDitchEvents.id': eventId })
        .select(
          'data_drainageDitchEvents.*',
          'ref_drainageDitchMethods.label as toteutusTapaLabel'
        );
    } else if (typeData.targetId == getIdByLabel(targets, 'Lämmitysmuoto')) {
      const [newSystemId] = await db('data_baseHeatingEvents')
        .where({ id: eventId })
        .pluck('newSystemId');

      const heatingTypes = await db('ref_heatingTypes');

      const query = db('data_baseHeatingEvents')
        .join('ref_heatingTypes as oldSystem', {
          'oldSystem.id': 'data_baseHeatingEvents.oldSystemId',
        })
        .join('ref_heatingTypes as newSystem', {
          'newSystem.id': 'data_baseHeatingEvents.newSystemId',
        })
        .select(
          'data_baseHeatingEvents.*',
          'oldSystem.name as oldSystemLabel',
          'newSystem.name as newSystemLabel'
        );

      if (newSystemId == getIdByLabel(heatingTypes, 'Öljy', 'name')) {
        query.join('data_oilHeatingEvents', {
          'data_oilHeatingEvents.id': 'data_baseHeatingEvents.id',
        });
      } else if (newSystemId == getIdByLabel(heatingTypes, 'Sähkö', 'name')) {
        query
          .join('data_electricHeatingEvents', {
            'data_electricHeatingEvents.id': 'data_baseHeatingEvents.id',
          })
          .join('ref_electricHeatingMethodTypes', {
            'ref_electricHeatingMethodTypes.id': 'data_electricHeatingEvents.methodId',
          })
          .select(
            'data_electricHeatingEvents.*',
            'ref_electricHeatingMethodTypes.label as methodLabel'
          );
      }

      return await query.where({ 'data_baseHeatingEvents.id': eventId });
    } else if (typeData.targetId == getIdByLabel(targets, 'Käyttövesiputket')) {
      return await db('data_kayttoVesiPutketEvents')
        .join('ref_kayttovesiPutketAsennusTavat', {
          'ref_kayttovesiPutketAsennusTavat.id': 'data_kayttoVesiPutketEvents.asennusTapaId',
        })
        .where({ 'data_kayttoVesiPutketEvents.id': eventId })
        .select(
          'data_kayttoVesiPutketEvents.*',
          'ref_kayttovesiPutketAsennusTavat.label as asennusTapaLabel'
        );
    } else if (typeData.targetId == getIdByLabel(targets, 'Viemäriputket')) {
      return await db('data_viemariPutketEvents')
        .join('ref_viemariPutketToteutusTapa', {
          'ref_viemariPutketToteutusTapa.id': 'data_viemariPutketEvents.toteutusTapaId',
        })
        .where({ 'data_viemariPutketEvents.id': eventId })
        .select(
          'data_viemariPutketEvents.*',
          'ref_viemariPutketToteutusTapa.label as toteutusTapaLabel'
        );
    } else if (typeData.targetId == getIdByLabel(targets, 'Eristys')) {
      return await db('data_eristeEvents')
        .join('ref_eristeKohde', { 'ref_eristeKohde.id': 'data_eristeEvents.kohdeId' })
        .join('ref_eristeMateriaalit', {
          'ref_eristeMateriaalit.id': 'data_eristeEvents.materiaaliId',
        })
        .where({ 'data_eristeEvents.id': eventId })
        .select(
          'data_eristeEvents.*',
          'ref_eristeMateriaalit.label as materialLabel',
          'ref_eristeKohde.label as targetLabel'
        );
    } else {
      throw new Error(
        'Extra data read logic for event with target ' + typeData.targetId + ' not implemented!'
      );
    }
  } else {
    return [];
  }
};
