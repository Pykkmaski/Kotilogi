import { Knex } from 'knex';
import { objects } from './objects';
import { EventDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { properties } from './properties';

class Events {
  /**
   * Creates a data-transform-object of an event. Creates a title based on the types of an event, if an actual title is not defined.
   * @param eventData
   * @returns
   */
  private getDTO(eventData: TODO) {
    const labels = [eventData.mainTypeLabel, eventData.targetLabel].filter(t => t != null);
    const title = labels.length ? labels.join(' > ') : eventData.title || 'Ei Otsikkoa.';
    const description = eventData.description || eventData.workTypeLabel;

    return {
      id: eventData.id,
      parentId: eventData.parentId,
      title,
      description,
      date: eventData.date,
      mainTypeLabel: eventData.mainTypeLabel,
      targetLabel: eventData.targetLabel,
      workTypeLabel: eventData.workTypeLabel,
      mainTypeId: eventData.mainTypeId,
      targetId: eventData.targetId,
      workTypeId: eventData.workTypeId,
    };
  }

  private async createHeatingData(eventId: string, extraData: any[], trx: Knex.Transaction) {
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

  private async createMainRenovationData(
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
      await this.createHeatingData(eventId, extraData, trx);
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

  private async createExtraData(
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
      await this.createMainRenovationData(eventId, extraData, typeData, trx);
    } else if (typeData.mainTypeId == surfaceRenovationId) {
      //Save the surfaces.
      for (const s of selectedSurfaceIds) {
        await trx('data_surfaces').insert({
          eventId,
          surfaceId: s,
        });
      }
      //throw new Error('Surface save-logic not implemented!');
    }
  }

  /**Updates the additional data associated with an event.
   * @param id The id of the event.
   * @param extraData The additional data to update with.
   * @param trx The knex transaction currently being used.
   */
  async updateExtraData(id: string, extraData: any, trx: Knex.Transaction) {
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

  /**
   * Prepares event data for insertion into the db.
   * @param data
   * @returns
   */
  private getInsertObject(data: TODO) {
    return {
      ...data,
      workTypeId: (data.workTypeId as any) == -1 ? null : data.workTypeId,
      targetId: (data.targetId as any) == -1 ? null : data.targetId,
    };
  }

  /**Creates a new event for a property.
   * @param mainData The main event data, containing its title, description, etc.
   * @param typeData The data containing the main type id, id of the target the event refers to, and optionally the id of the work type.
   * @param extraData The additional data to include with the main data.
   * @param selectedSurfaceIds The ids of the surfaces the event refers to. Used only for surface renovation events (Pintaremontti).
   * @param callback An optional callback function to run before commiting the data.
   */
  async create(
    mainData: Partial<EventDataType> & Required<Pick<EventDataType, 'parentId'>>,
    typeData: {
      mainTypeId: number;
      targetId: number;
      workTypeId?: number;
    },
    extraData: any[],
    selectedSurfaceIds: number[],
    callback?: (id: string, trx: Knex.Transaction) => Promise<void>
  ) {
    await properties.verifyEventCount(mainData.parentId);

    await objects.create(mainData, async (obj, trx) => {
      const eventId = obj.id;
      const eventData = this.getInsertObject({
        ...filterValidColumns(
          { ...mainData, ...typeData },
          await getTableColumns('data_propertyEvents', trx)
        ),
        id: eventId,
      });

      //Save the main event data.
      await trx('data_propertyEvents').insert(eventData);

      //Create the additional data entries.
      await this.createExtraData(eventId, extraData, typeData, selectedSurfaceIds, trx);
      callback && (await callback(eventId, trx));
    });
  }

  /**
   * Fetches events from the database.
   * @param query The knex query-object to use.
   * @param search An optional search-string with which to filter the results based on the title, description, main type, target or work type labels.
   * @param limit An optional limit to how many results are returned. Defaults to 10.
   * @param page An optional page number to offset the results by. Defaults to 0 (The first page).
   * @returns
   */
  async get(query: TODO, search?: string, limit: number = 10, page: number = 0) {
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
      .map(e => this.getDTO(e));
  }

  private async getRoofEvent(eventId: string) {
    return await db('data_roofEvents')
      .join('ref_roofTypes', { 'ref_roofTypes.id': 'data_roofEvents.roofTypeId' })
      .join('ref_roofMaterials', { 'ref_roofMaterials.id': 'data_roofEvents.roofMaterialId' })
      .join('ref_mainColors', { 'ref_mainColors.id': 'data_roofEvents.colorId' })
      .join('ref_raystastyypit', { 'ref_raystastyypit.id': 'data_roofEvents.raystasTyyppiId' })
      .join('ref_otsalautatyypit', {
        'ref_otsalautatyypit.id': 'data_roofEvents.otsalautaTyyppiId',
      })
      .join('ref_aluskatetyypit', {
        'ref_aluskatetyypit.id': 'data_roofEvents.aluskateTyyppiId',
      })
      .where({ 'data_roofEvents.id': eventId })
      .select(
        'ref_roofMaterials.name as materialLabel',
        'ref_roofTypes.name as typeLabel',
        'ref_mainColors.name as colorLabel',
        'ref_raystastyypit.label as raystasTyyppiLabel',
        'ref_otsalautatyypit.label as otsalautaTyyppiLabel',
        'ref_aluskatetyypit.label as aluskateTyyppiLabel',
        'data_roofEvents.*'
      );
  }

  private async getDrainageDitchEvent(eventId: string) {
    return await db('data_drainageDitchEvents')
      .join('ref_drainageDitchMethods', {
        'ref_drainageDitchMethods.id': 'data_drainageDitchEvents.toteutusTapaId',
      })
      .where({ 'data_drainageDitchEvents.id': eventId })
      .select('data_drainageDitchEvents.*', 'ref_drainageDitchMethods.label as toteutusTapaLabel');
  }

  private async getHeatingEvent(eventId: string) {
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
        'data_baseHeatingEvents.brand as newSystemBrandLabel',
        'data_baseHeatingEvents.model as newSystemModelLabel',
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
  }

  private async getWaterEvent(eventId: string) {
    return await db('data_kayttoVesiPutketEvents')
      .join('ref_kayttovesiPutketAsennusTavat', {
        'ref_kayttovesiPutketAsennusTavat.id': 'data_kayttoVesiPutketEvents.asennusTapaId',
      })
      .where({ 'data_kayttoVesiPutketEvents.id': eventId })
      .select(
        'data_kayttoVesiPutketEvents.*',
        'ref_kayttovesiPutketAsennusTavat.label as asennustapaLabel'
      );
  }

  private async getSewegeEvent(eventId: string) {
    return await db('data_viemariPutketEvents')
      .join('ref_viemariPutketToteutusTapa', {
        'ref_viemariPutketToteutusTapa.id': 'data_viemariPutketEvents.toteutusTapaId',
      })
      .where({ 'data_viemariPutketEvents.id': eventId })
      .select('data_viemariPutketEvents.*', 'ref_viemariPutketToteutusTapa.label as Toteutustapa');
  }

  private async getInsulationEvent(eventId: string) {
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
  }

  private async getElectricityEvent(eventId: string) {
    return await db('data_electricityEvents')
      .join('ref_electricityJobTargets', {
        'ref_electricityJobTargets.id': 'data_electricityEvents.jobTargetId',
      })
      .where({ 'data_electricityEvents.id': eventId })
      .select('data_electricityEvents.*', 'ref_electricityJobTargets.label as Työn kohde');
  }

  private async getLockEvent(eventId: string) {
    return await db('data_lockEvents')
      .join('ref_lockTypes', { 'ref_lockTypes.id': 'data_lockEvents.lockTypeId' })
      .where({ 'data_lockEvents.id': eventId })
      .select('data_lockEvents.*', 'ref_lockTypes.label as Lukon tyyppi');
  }

  /**Fetches the additional data associated with an event
   * @param eventId The id of the event to fetch additional data for.
   * @returns An array containing the extra data.
   * @throws An error if the event has a main type, or target id, for which no functionality is implemented yet.
   */
  async getExtraData(eventId: string) {
    const [typeData] = await db('data_propertyEvents')
      .where({ id: eventId })
      .select('mainTypeId', 'targetId', 'workTypeId');
    const mainTypes = await db('ref_mainEventTypes');

    if (typeData.mainTypeId == getIdByLabel(mainTypes, 'Peruskorjaus')) {
      const targets = await db('ref_eventTargets');

      if (typeData.targetId == getIdByLabel(targets, 'Katto')) {
        return await this.getRoofEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Salaojat')) {
        return await this.getDrainageDitchEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Lämmitysmuoto')) {
        return await this.getHeatingEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Käyttövesiputket')) {
        return await this.getWaterEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Viemäriputket')) {
        return await this.getSewegeEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Eristys')) {
        return await this.getInsulationEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Sähköt')) {
        return await this.getElectricityEvent(eventId);
      } else if (typeData.targetId == getIdByLabel(targets, 'Lukitus')) {
        return await this.getLockEvent(eventId);
      } else {
        console.log(
          `Received an event with target id ${typeData.targetId}, but no read logic for that id is implemented. Make sure this is intentional.`
        );
      }
    }
    return [];
  }

  /**Updates the main event data.
   * @param id The id of the event to update.
   * @param data The main event data to update with.
   * @param extraData An array containing the additional data associated with the event.
   */
  async update(id: string, data: Partial<EventDataType>, extraData: any[]) {
    //Only allow the author of an event to update it.
    await objects.verifySessionUserIsAuthor(id);

    await objects.update(id, data, async trx => {
      const insertObj = this.getInsertObject(
        filterValidColumns(data, await getTableColumns('data_propertyEvents', trx))
      );
      await trx('data_propertyEvents').where({ id: data.id }).update(insertObj);
      const extraDataPromises = extraData.map(d => this.updateExtraData(id, d, trx));
      await Promise.all(extraDataPromises);
    });
  }

  /**Deletes an event. Throws an error if the logged in user is not the author of the event, or if the event is locked.
   * @param id The id of the event to delete.
   */
  async del(id: string) {
    //Only allow the author of the event to delete it.
    await objects.verifySessionUserIsAuthor(id);
    await this.verifyNotLocked(id);
    await objects.del(id);
  }

  /**Throws an error if the event is at least 30 days old. */
  async verifyNotLocked(eventId: string) {
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
  }
}

export const events = new Events();
