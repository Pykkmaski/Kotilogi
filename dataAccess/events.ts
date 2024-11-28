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
      labourExpenses: eventData.labourExpenses,
      materialExpenses: eventData.materialExpenses,
    };
  }

  private async createHeatingData(eventId: string, extraData: any[], trx: Knex.Transaction) {
    const [data] = extraData;
    const { newSystemId } = data;
    const heatingTypes = await trx('ref_heatingTypes');
    if (newSystemId == getIdByLabel(heatingTypes, 'Öljy', 'name')) {
      //Oil heating event
      await trx('oil_heating.vessels').insert({
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
      .join('events.targets', {
        'events.targets.id': 'map_workTargetsToMainEventType.targetId',
      })
      .select('events.targets.*');

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
      await runBaseInsert('roofs.data');
    }
    //Salaojat
    else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Salaojat')) {
      //Save drainage ditch data.
      await runBaseInsert('drainage_ditches.data');
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
      await runBaseInsert('insulation.data');
    }
    //Sähköt
    else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Sähköt')) {
      await runBaseInsert('data_electricityEvents');
    }
    //Lukitus
    else if (typeData.targetId == getIdByLabel(mainRenovationTargets, 'Lukitus')) {
      await runBaseInsert('locking.data');
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
    const [mainRenovationId] = await trx('events.types')
      .where({ label: 'Peruskorjaus' })
      .pluck('id');

    const [surfaceRenovationId] = await trx('events.types')
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
    const mainTypes = await trx('events.types');
    const [typeData] = await trx('events.data')
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
      const targets = await trx('events.targets');
      if (typeData.targetId == getIdByLabel(targets, 'Katto')) {
        await runUpdate('roofs.data');
      } else if (typeData.targetId == getIdByLabel(targets, 'Salaojat')) {
        await runUpdate('drainage_ditches.data');
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
          await getTableColumns('data', trx, 'events')
        ),
        id: eventId,
      });

      //Save the main event data.
      await trx('events.data').insert(eventData);

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
      newQuery['objects.data.id'] = query.id;
    }

    delete newQuery.id;

    const events = await db('objects.data')
      .join('events.data', { 'events.data.id': 'objects.data.id' })
      .leftJoin('events.targets', { 'events.data.targetId': 'events.targets.id' })
      .leftJoin('public.ref_eventWorkTypes', {
        'events.data.workTypeId': 'public.ref_eventWorkTypes.id',
      })
      .leftJoin('events.types', {
        'events.data.mainTypeId': 'events.types.id',
      })

      .select(
        'objects.data.*',
        'events.data.*',
        'events.targets.label as targetLabel',
        'public.ref_eventWorkTypes.label as workTypeLabel',
        'events.types.label as mainTypeLabel'
      )
      .where(function () {
        if (!search) return;
        const q = `%${search}%`;
        this.whereILike('objects.data.title', q)
          .orWhereILike('objects.data.description', q)
          .orWhereILike('events.types.label', q)
          .orWhereILike('events.targets.label', q)
          .orWhereILike('ref_eventWorkTypes.label', q);
      })
      .andWhere(newQuery)
      .limit(limit)
      .offset(page * limit)
      .orderBy('events.data.date', 'desc');

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
    return await db('roofs.data')
      .join('roofs.types', { 'roofs.types.id': 'roofs.data.roofTypeId' })
      .join('roofs.materials', { 'roofs.materials.id': 'roofs.data.roofMaterialId' })
      .join('ref_mainColors', { 'ref_mainColors.id': 'roofs.data.colorId' })
      .join('roofs.ref_raystastyypit', {
        'roofs.ref_raystastyypit.id': 'roofs.data.raystasTyyppiId',
      })
      .join('roofs.ref_otsalautatyypit', {
        'roofs.ref_otsalautatyypit.id': 'roofs.data.otsalautaTyyppiId',
      })
      .join('roofs.ref_aluskatetyypit', {
        'roofs.ref_aluskatetyypit.id': 'roofs.data.aluskateTyyppiId',
      })
      .where({ 'roofs.data.id': eventId })
      .select(
        'roofs.materials.name as materialLabel',
        'roofs.types.name as typeLabel',
        'ref_mainColors.name as colorLabel',
        'roofs.ref_raystastyypit.label as raystasTyyppiLabel',
        'roofs.ref_otsalautatyypit.label as otsalautaTyyppiLabel',
        'roofs.ref_aluskatetyypit.label as aluskateTyyppiLabel',
        'roofs.data.*'
      );
  }

  private async getDrainageDitchEvent(eventId: string) {
    return await db('drainage_ditches.data')
      .join('drainage_ditches.implementation_methods', {
        'drainage_ditches.implementation_methods.id': 'drainage_ditches.data.toteutusTapaId',
      })
      .where({ 'drainage_ditches.data.id': eventId })
      .select(
        'drainage_ditches.data.*',
        'drainage_ditches.implementation_methods.label as toteutusTapaLabel'
      );
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
      query.join('oil_heating.vessels', {
        'oil_heating.vessels.id': 'data_baseHeatingEvents.id',
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
    return await db('insulation.data')
      .join('insulation.targets', { 'insulation.targets.id': 'insulation.data.kohdeId' })
      .join('insulation.materials', {
        'insulation.materials.id': 'insulation.data.materiaaliId',
      })
      .where({ 'insulation.data.id': eventId })
      .select(
        'insulation.data.*',
        'insulation.materials.label as materialLabel',
        'insulation.targets.label as targetLabel'
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
    return await db('locking.data')
      .join('locking.types', { 'locking.types.id': 'locking.data.lockTypeId' })
      .where({ 'locking.data.id': eventId })
      .select('locking.data.*', 'locking.types.label as Lukon tyyppi');
  }

  /**Fetches the additional data associated with an event
   * @param eventId The id of the event to fetch additional data for.
   * @returns An array containing the extra data.
   * @throws An error if the event has a main type, or target id, for which no functionality is implemented yet.
   */
  async getExtraData(eventId: string) {
    const [typeData] = await db('events.data')
      .where({ id: eventId })
      .select('mainTypeId', 'targetId', 'workTypeId');
    const mainTypes = await db('events.types');

    if (typeData.mainTypeId == getIdByLabel(mainTypes, 'Peruskorjaus')) {
      const targets = await db('events.targets');

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
        filterValidColumns(data, await getTableColumns('data', trx, 'events'))
      );
      await trx('events.data').where({ id: data.id }).update(insertObj);
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
    const [timestamp] = await db('events.data')
      .join('objects.data', { 'objects.data.id': 'events.data.id' })
      .where({ 'events.data.id': eventId })
      .select('objects.data.timestamp');

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
