import { Knex } from 'knex';
import { objects } from './objects';
import {
  ElectricityRestorationWorkType,
  EventDataType,
  HeatingMethodRestorationWorkType,
  InsulationRestorationWorkType,
  RoofDataType,
  SewerPipeRestorationWorkType,
  WaterPipeRestorationWorkType,
} from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { properties } from './properties';

type TypeDataType = {
  event_type_id: number;
  target_id: number;
  work_type_id?: number;
};

type MainEventDataType = Partial<EventDataType> &
  Required<Pick<EventDataType, 'property_id'>> &
  Required<Pick<EventDataType, 'event_type_id'>> &
  Required<Pick<EventDataType, 'target_id'>>;

type ExtraEventDataType = (
  | RoofDataType
  | ElectricityRestorationWorkType
  | WaterPipeRestorationWorkType
  | SewerPipeRestorationWorkType
  | InsulationRestorationWorkType
  | HeatingMethodRestorationWorkType
  | any
)[];

type RestorationWorkDataType =
  | RoofDataType
  | ElectricityRestorationWorkType
  | WaterPipeRestorationWorkType
  | SewerPipeRestorationWorkType
  | HeatingMethodRestorationWorkType
  | InsulationRestorationWorkType;

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
      event_type_id: eventData.event_type_id,
      target_id: eventData.target_id,
      workTypeId: eventData.workTypeId,
      labourExpenses: eventData.labourExpenses,
      materialExpenses: eventData.materialExpenses,
    };
  }

  private async createHeatingRestorationWorkData(
    event_id: string,
    restoration_work_data: HeatingMethodRestorationWorkType,
    trx: Knex.Transaction
  ) {
    const { new_system_id } = restoration_work_data;
    const [{ result: heating_types }] = await trx('heating.types').select(
      db.raw('json_object_agg(label, id) as result')
    );

    switch (new_system_id) {
      case heating_types['Öljy']:
        {
          //Save the vessel, and the heating center data.

          await trx('heating.oil_vessel').insert({
            event_id,
            volume: data.volume,
            location: data.vessel_location,
          });
        }
        break;

      case new_system_id:
        {
          await trx('heating.electric_heating_restoration_work').insert({
            id: event_id,
            restoration_method_id: data.restoration_method_id,
          });
        }
        break;

      default:
        throw new Error('Invalid new system id! (' + new_system_id + ')');
    }
  }

  private async createRestorationWorkData(
    property_id: string,
    event_id: string,
    target_id: number,
    extraData: RestorationWorkDataType[],
    trx: Knex.Transaction
  ) {
    const [{ result: event_targets }] = await trx('events.targets').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const event_target_id = parseInt(target_id as any);

    switch (event_target_id) {
      case event_targets['Lämmitysmuoto']:
        {
          //Save heating event data.
          const [data] = extraData as [HeatingMethodRestorationWorkType];
          await trx('heating.restoration_work').insert({
            event_id,
            old_system_id: data.old_system_id,
            new_system_id: data.new_system_id,
          });

          //TODO: insert the peripheral data, like oil vessels, heating centers, etc.
        }
        break;

      case event_targets.Katto:
        {
          //Does not have restoration work separately. Update the existing roof entry or add a new one.
          const [data] = extraData as [RoofDataType];

          await trx('roofs.overview')
            .insert({
              ...filterValidColumns(data, await getTableColumns('overview', trx, 'roofs')),
              property_id,
            })
            .onConflict('property_id')
            .merge();
        }
        break;

      case event_targets.Salaojat:
        {
          //Has no separate restoration work data. Update the existing ditch entry, or add a new one.
          const [data] = extraData as [TODO];
          await trx('drainage_ditches.data')
            .insert({
              ...filterValidColumns(data, await getTableColumns('data', trx, 'drainage_ditches')),
              id: event_id,
            })
            .onConflict('id')
            .merge();
        }
        break;

      case event_targets['Käyttövesiputket']:
        {
          const [data] = extraData as [WaterPipeRestorationWorkType];
          await trx('water_pipe.restoration_work').insert({
            event_id,
            installation_method_id: data.installation_method_id,
          });
        }
        break;

      case event_targets['Viemäriputket']:
        {
          const [data] = extraData as [SewerPipeRestorationWorkType];
          await trx('sewer_pipe.restoration_work').insert({
            event_id,
            restoration_method_id: data.restoration_method_id,
          });
        }
        break;

      case event_targets['Eristys']:
        {
          const [data] = extraData as [InsulationRestorationWorkType];
          await trx('insulation.restoration_work').insert({
            event_id,
            insulation_material_id: data.insulation_material_id,
            insulation_target_id: data.insulation_target_id,
          });
        }
        break;

      case event_targets['Sähköt']:
        {
          const [data] = extraData as [ElectricityRestorationWorkType];
          await trx('electricity.restoration_work').insert({
            event_id,
            restoration_work_target_id: data.restoration_work_target_id,
          });
        }
        break;

      case event_targets.Lukitus:
        {
          const [data] = extraData as [TODO];

          await trx('locking.data')
            .insert({
              id: event_id,
              lock_type_id: data.lock_type_id,
              model: data.model,
              brand: data.brand,
              quantity: data.quantity,
            })
            .onConflict('id')
            //TODO: In the rare case the same uuid is generated for a new unrelated event, it would overwrite this. Figure something out.
            .merge();
        }
        break;

      default:
        console.log(
          `Received an event with target id ${target_id}, but no logic for inserting extra data for that id exists. Make sure this is intentional.`
        );
    }
  }

  /**Updates the additional data associated with an event.
   * @param id The id of the event.
   * @param extraData The additional data to update with.
   * @param trx The knex transaction currently being used.
   */
  async updateExtraData(id: string, extraData: any, trx: Knex.Transaction) {
    const mainTypes = await trx('events.types');
    const [type_data] = await trx('events.data')
      .where({ id })
      .select('event_type_id', 'target_id', 'workTypeId');

    const runUpdate = async (table: string) => {
      await trx(table)
        .where({ id })
        .update({
          ...extraData,
        });
    };

    if (type_data.event_type_id == getIdByLabel(mainTypes, 'Peruskorjaus')) {
      const targets = await trx('events.targets');
      if (type_data.target_id == getIdByLabel(targets, 'Katto')) {
        await runUpdate('roofs.overview');
      } else if (type_data.target_id == getIdByLabel(targets, 'Salaojat')) {
        await runUpdate('drainage_ditches.data');
      } else {
        throw new Error(
          'Update logic for extra event data with type ' +
            type_data.event_type_id +
            ' and target ' +
            type_data.target_id +
            ' not implemented!'
        );
      }
    } else {
      throw new Error(
        'Update logic for event with main type ' + type_data.event_type_id + ' not implemented!'
      );
    }
  }

  /**
   * Prepares the base event data for insertion into the db.
   * @param data
   * @returns
   */
  private getInsertObject(data: TODO) {
    return {
      id: data.id,
      event_type_id: data.event_type_id,
      target_id: (data.target_id as any) == -1 ? null : data.target_id,
      date: data.date,
      labour_expenses: data.labour_expenses,
      material_expenses: data.material_expenses,
      property_id: data.property_id,
    };
  }

  private async createServiceWorkData(
    event_id: string,
    target_id: number,
    service_work_type_id: number | null,
    extraData: TODO,
    trx: Knex.Transaction
  ) {
    const [{ result: event_targets }] = await trx('events.targets').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const insert = async (tablename: string) =>
      await trx(tablename).insert({
        service_work_type_id: service_work_type_id,
        event_id,
      });

    const event_target_id = parseInt(target_id as any);
    switch (event_target_id) {
      case event_targets['Ilmanvaihto']:
        {
          await insert('ventilation.service_work');
        }
        break;

      case event_targets['Lämmitysmuoto']:
        {
          await insert('heating.service_work');
        }
        break;

      case event_targets['Salaojat']:
        {
          await insert('drainage_ditches.service_work');
        }
        break;

      case event_targets['Lämmönjako']:
        {
          await insert('heating.distribution_service_work');
        }
        break;

      case event_targets['Katto']:
        {
          await insert('roofs.service_work');
        }
        break;
    }
  }

  private async createSurfaceRenovationWorkData(
    event_id: string,
    target_id: number,
    extraData: TODO,
    trx: Knex.Transaction
  ) {
    throw new Error('Function not implemented!');
  }

  /**Creates a new event for a property.
   * @param eventData The main event data, containing its title, description, etc.
   * @param type_data The data containing the main type id, id of the target the event refers to, and optionally the id of the work type.
   * @param extraData The additional data to include with the main data.
   * @param selectedSurfaceIds The ids of the surfaces the event refers to. Used only for surface renovation events (Pintaremontti).
   * @param callback An optional callback function to run before commiting the data.
   */
  async create(
    eventData: MainEventDataType,
    extraData: ExtraEventDataType[],
    callback?: (id: string, trx: Knex.Transaction) => Promise<void>
  ) {
    await properties.verifyEventCount(eventData.property_id);

    await objects.create(eventData, async (obj, trx) => {
      const event_id = obj.id;
      const insertData = this.getInsertObject({
        ...filterValidColumns({ ...eventData }, await getTableColumns('data', trx, 'events')),
        id: event_id,
      });

      //Save the main event data.
      await trx('events.data').insert(insertData);

      const [{ result: event_types }] = await trx('events.types').select(
        db.raw('json_object_agg(label, id) as result')
      );
      const event_type_id = parseInt(eventData.event_type_id as any);

      //Create the additional data entries.
      switch (event_type_id) {
        case event_types.Peruskorjaus:
          {
            const data = extraData as unknown as RestorationWorkDataType[];
            await this.createRestorationWorkData(
              eventData.property_id,
              event_id,
              eventData.target_id,
              data,
              trx
            );
          }
          break;

        case event_types['Huoltotyö']:
          {
            await this.createServiceWorkData(
              event_id,
              eventData.target_id,
              eventData.service_work_type_id,
              extraData,
              trx
            );
          }
          break;

        case event_types['Pintaremontti']:
          {
            await this.createSurfaceRenovationWorkData(
              event_id,
              eventData.target_id,
              extraData,
              trx
            );
          }
          break;
      }

      callback && (await callback(event_id, trx));
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
      .leftJoin('events.targets', { 'events.data.target_id': 'events.targets.id' })

      .leftJoin('events.types', {
        'events.data.event_type_id': 'events.types.id',
      })

      .select(
        'objects.data.*',
        'events.data.*',
        'events.targets.label as targetLabel',

        'events.types.label as mainTypeLabel'
      )
      .where(function () {
        if (!search) return;
        const q = `%${search}%`;
        this.whereILike('objects.data.title', q)
          .orWhereILike('objects.data.description', q)
          .orWhereILike('events.types.label', q)
          .orWhereILike('events.targets.label', q);
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
    return await db('roofs.overview')
      .join('roofs.types', { 'roofs.types.id': 'roofs.overview.roofTypeId' })
      .join('roofs.materials', { 'roofs.materials.id': 'roofs.overview.roofMaterialId' })
      .join('ref_mainColors', { 'ref_mainColors.id': 'roofs.overview.colorId' })
      .join('roofs.ref_raystastyypit', {
        'roofs.ref_raystastyypit.id': 'roofs.overview.raystasTyyppiId',
      })
      .join('roofs.ref_otsalautatyypit', {
        'roofs.ref_otsalautatyypit.id': 'roofs.overview.otsalautaTyyppiId',
      })
      .join('roofs.ref_aluskatetyypit', {
        'roofs.ref_aluskatetyypit.id': 'roofs.overview.aluskateTyyppiId',
      })
      .where({ 'roofs.overview.id': eventId })
      .select(
        'roofs.materials.name as materialLabel',
        'roofs.types.name as typeLabel',
        'ref_mainColors.name as colorLabel',
        'roofs.ref_raystastyypit.label as raystasTyyppiLabel',
        'roofs.ref_otsalautatyypit.label as otsalautaTyyppiLabel',
        'roofs.ref_aluskatetyypit.label as aluskateTyyppiLabel',
        'roofs.overview.*'
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

    const heatingTypes = await db('heating.types');

    const query = db('data_baseHeatingEvents')
      .join('heating.types as oldSystem', {
        'oldSystem.id': 'data_baseHeatingEvents.oldSystemId',
      })
      .join('heating.types as newSystem', {
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
    const [type_data] = await db('events.data')
      .where({ id: eventId })
      .select('event_type_id', 'target_id', 'workTypeId');
    const mainTypes = await db('events.types');

    if (type_data.event_type_id == getIdByLabel(mainTypes, 'Peruskorjaus')) {
      const targets = await db('events.targets');

      if (type_data.target_id == getIdByLabel(targets, 'Katto')) {
        return await this.getRoofEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Salaojat')) {
        return await this.getDrainageDitchEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Lämmitysmuoto')) {
        return await this.getHeatingEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Käyttövesiputket')) {
        return await this.getWaterEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Viemäriputket')) {
        return await this.getSewegeEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Eristys')) {
        return await this.getInsulationEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Sähköt')) {
        return await this.getElectricityEvent(eventId);
      } else if (type_data.target_id == getIdByLabel(targets, 'Lukitus')) {
        return await this.getLockEvent(eventId);
      } else {
        console.log(
          `Received an event with target id ${type_data.target_id}, but no read logic for that id is implemented. Make sure this is intentional.`
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
