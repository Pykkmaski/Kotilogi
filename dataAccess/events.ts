import { Knex } from 'knex';
import { objects } from './objects';
import { EventPayloadType, HeatingMethodRestorationWorkType, HeatingPayloadType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { properties } from './properties';
import { heating } from './heating';
import { roofs } from './roofs';

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

  public async createGenesisEvent(
    targetLabel: string,
    payload: Partial<EventPayloadType> & Required<Pick<EventPayloadType, 'property_id'>>,

    ctx: Knex.Transaction
  ) {
    let id: string;
    await objects.create(
      payload,
      async (obj, trx) => {
        [id] = await trx('events.data').insert(
          db.raw(
            `
              (id, event_type_id, target_id, date) VALUES (
                ?,
                (SELECT id FROM events.types WHERE label = 'genesis' limit 1),
                (SELECT id FROM events.types WHERE label = ? limit 1),
                CURRENT_DATE
              )
            `,
            [obj.id, targetLabel]
          ),
          'id'
        );
      },
      ctx
    );
    return id;
  }

  private async createHeatingRestorationWorkData(
    event_id: string,
    heatingPayload: HeatingMethodRestorationWorkType & HeatingPayloadType,
    trx: Knex.Transaction
  ) {
    await trx('heating.restoration_work').insert({
      event_id,
      old_system_id: heatingPayload.old_system_id,
      new_system_id: heatingPayload.new_system_id,
    });

    const [{ result: heatingTypes }] = await trx('heating.types').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const { new_system_id } = heatingPayload;
    await heating.update(heatingPayload.id, heatingPayload, trx);
  }

  private async createRestorationWorkData(
    event_id: string,
    payload: EventPayloadType,
    trx: Knex.Transaction
  ) {
    const [{ result: event_targets }] = await trx('events.targets').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const event_target_id = parseInt(payload.target_id as any);

    switch (event_target_id) {
      case event_targets['Lämmitysmuoto']:
        {
          const { new_system_id, old_system_id } = payload;
          let oldSystemType: number;

          if (old_system_id) {
            [oldSystemType] = await trx('heating.data')
              .where({ id: old_system_id })
              .pluck('heating_type_id');
            //Delete the old heating system.
            await heating.del(old_system_id as any, trx);
          }

          await trx('heating.heating_restoration_work').insert({
            event_id,
            old_system_id: oldSystemType,
            new_system_id,
          });

          //Create the replacement heating.
          await heating.create({ ...payload, heating_type_id: new_system_id } as any, trx);
        }
        break;

      case event_targets.Katto:
        {
          const [roofId] = await trx('roofs.overview')
            .where({ property_id: payload.property_id })
            .pluck('property_id');
          if (roofId) {
            await roofs.update(roofId, payload, trx);
          } else {
            await roofs.create(event_id, payload, trx);
          }
        }
        break;

      case event_targets.Salaojat:
        {
          const [ditchId] = await trx('drainage_ditches.data')
            .where({ property_id: payload.property_id })
            .pluck('property_id');

          if (ditchId) {
            await trx('drainage_ditches.data')
              .where({ property_id: ditchId })
              .update({
                ...filterValidColumns(
                  payload,
                  await getTableColumns('data', trx, 'drainage_ditches')
                ),
                property_id: payload.property_id,
              });
          } else {
            await trx('drainage_ditches.data').insert({
              ...filterValidColumns(
                payload,
                await getTableColumns('data', trx, 'drainage_ditches')
              ),
              property_id: payload.property_id,
            });
          }
        }
        break;

      case event_targets['Käyttövesiputket']:
        {
          await trx('water_pipe.restoration_work').insert({
            event_id,
            installation_method_id: payload.installation_method_id,
          });
        }
        break;

      case event_targets['Viemäriputket']:
        {
          await trx('sewer_pipe.restoration_work').insert({
            event_id,
            restoration_method_type_id: payload.restoration_method_type_id,
          });
        }
        break;

      case event_targets['Eristys']:
        {
          await trx('insulation.restoration_work').insert({
            event_id,
            insulation_material_id: payload.insulation_material_id,
            insulation_target_id: payload.insulation_target_id,
          });
        }
        break;

      case event_targets['Sähköt']:
        {
          await trx('electricity.restoration_work').insert({
            event_id,
            restoration_work_target_id: payload.restoration_work_target_id,
          });
        }
        break;

      case event_targets.Lukitus:
        {
          const { locks } = payload;
          const promises = locks.map(async l => {
            return trx('locking.data').insert({
              ...filterValidColumns(l, await getTableColumns('data', trx, 'locking')),
              event_id,
            });
          });
          await Promise.all(promises);
        }
        break;

      case event_targets['Ikkunat']:
        {
          const { windows } = payload;
          const promises = windows.map(w =>
            trx('windows.data').insert({
              ...w,
              event_id,
            })
          );
          await Promise.all(promises);
        }
        break;

      default:
        console.warn(
          `Received an event with target id ${payload.target_id}, but no logic for inserting specific event data exists. Make sure this is intentional.`
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

  private async createServiceWorkData(event_id: string, payload: TODO, trx: Knex.Transaction) {
    const [{ result: event_targets }] = await trx('events.targets').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const { service_work_type_id, target_id } = payload;

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
    payload: Partial<EventPayloadType>,
    trx: Knex.Transaction
  ) {
    const promises = payload.surfaces?.map(s => {
      return trx('data_surfaces').insert({ event_id, surfaceId: s });
    });

    await Promise.all(promises);
  }

  /**Creates a new event for a property.
   * @param eventData The main event data, containing its title, description, etc.
   * @param type_data The data containing the main type id, id of the target the event refers to, and optionally the id of the work type.
   * @param extraData The additional data to include with the main data.
   * @param selectedSurfaceIds The ids of the surfaces the event refers to. Used only for surface renovation events (Pintaremontti).
   * @param callback An optional callback function to run before commiting the data.
   */
  async create(
    eventPayload: EventPayloadType,
    callback?: (id: string, trx: Knex.Transaction) => Promise<void>
  ) {
    await properties.verifyEventCount(eventPayload.property_id);

    await objects.create(
      { ...eventPayload, parentId: eventPayload.property_id },
      async (obj, trx) => {
        const event_id = obj.id;
        const insertData = this.getInsertObject({
          ...filterValidColumns({ ...eventPayload }, await getTableColumns('data', trx, 'events')),
          id: event_id,
        });

        //Save the main event data.
        await trx('events.data').insert(insertData);

        const [{ result: event_types }] = await trx('events.types').select(
          db.raw('json_object_agg(label, id) as result')
        );
        const event_type_id = parseInt(eventPayload.event_type_id as any);

        //Create the additional data entries.
        switch (event_type_id) {
          case event_types.Peruskorjaus:
            {
              await this.createRestorationWorkData(event_id, eventPayload, trx);
            }
            break;

          case event_types['Huoltotyö']:
            {
              await this.createServiceWorkData(event_id, eventPayload, trx);
            }
            break;

          case event_types['Pintaremontti']:
            {
              await this.createSurfaceRenovationWorkData(event_id, eventPayload, trx);
            }
            break;

          default:
            throw new Error('Handler for event type not implemented!');
        }

        callback && (await callback(event_id, trx));
      }
    );
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
      .where({ 'roofs.overview.event_id': eventId })
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
      .where({ 'drainage_ditches.data.event_id': eventId })
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
    return await db('water_pipe.restoration_work')
      .join('water_pipe.installation_method', {
        'water_pipe.installation_method.id': 'water_pipe.restoration_work.installation_method_id',
      })
      .where({ 'water_pipe.restoration_work.event_id': eventId })
      .select(
        'water_pipe.restoration_work.*',
        'water_pipe.installation_method.label as asennustapaLabel'
      );
  }

  private async getSewegeEvent(eventId: string) {
    return await db('sewer_pipe.restoration_work')
      .join('sewer_pipe.restoration_method_type', {
        'sewer_pipe.restoration_method_type.id':
          'sewer_pipe.restoration_work.restoration_method_type_id',
      })
      .where({ 'sewer_pipe.restoration_work.event_id': eventId })
      .select(
        'sewer_pipe.restoration_work.*',
        'sewer_pipe.restoration_method_type.label as Toteutustapa'
      );
  }

  private async getInsulationEvent(eventId: string) {
    return await db('insulation.restoration_work')
      .join('insulation.targets', {
        'insulation.targets.id': 'insulation.restoration_work.insulation_target_id',
      })
      .join('insulation.materials', {
        'insulation.materials.id': 'insulation.restoration_work.insulation_material_id',
      })
      .where({ 'insulation.restoration_work.event_id': eventId })
      .select(
        'insulation.restoration_work.*',
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
      .join('locking.types', { 'locking.types.id': 'locking.data.lock_type_id' })
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
  async update(id: string, data: Partial<EventPayloadType>) {
    //Only allow the author of an event to update it.
    await objects.verifySessionUserIsAuthor(id);

    throw new Error('Method not implemented!');
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
