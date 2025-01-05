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

  /**
   *
   * @param targetLabel
   * @param payload
   * @param ctx
   * @deprecated Not in use.
   * @returns
   */
  public async createGenesisEvent(
    targetLabel: string,
    payload: Partial<EventPayloadType> & Required<Pick<EventPayloadType, 'property_id'>>,

    ctx: Knex.Transaction
  ) {
    let id: string;
    await objects.create(
      payload,
      async (obj, trx) => {
        [id] = await trx('event').insert(
          db.raw(
            `
              (id, event_type_id, target_id, date) VALUES (
                ?,
                (SELECT id FROM types.event_type WHERE label = 'genesis' limit 1),
                (SELECT id FROM types.event_type WHERE label = ? limit 1),
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

  /**@deprecated */
  private async createHeatingRestorationWorkData(
    event_id: string,
    heatingPayload: HeatingMethodRestorationWorkType & HeatingPayloadType,
    trx: Knex.Transaction
  ) {
    await trx('restoration_events.heating_restoration_event').insert({
      event_id,
      old_system_id: heatingPayload.old_system_id,
      new_system_id: heatingPayload.new_system_id,
    });

    const [{ result: heatingTypes }] = await trx('types.heating_type').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const { new_system_id } = heatingPayload;
    await heating.update(heatingPayload.id, heatingPayload, trx);
  }

  /**Inserts data related to a restoration event. */
  private async createRestorationWorkData(
    event_id: string,
    payload: EventPayloadType,
    trx: Knex.Transaction
  ) {
    const [{ result: event_targets }] = await trx('types.event_target_type').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const event_target_id = parseInt(payload.target_id as any);

    switch (event_target_id) {
      case event_targets['Lämmitysmuoto']:
        {
          const { new_system_id, old_system_id } = payload;
          let oldSystemType: number;
          let oldSystemIsPrimary = false;

          if (old_system_id && old_system_id != -1) {
            [oldSystemType] = await trx('heating')
              .where({ id: old_system_id })
              .pluck('heating_type_id');

            const [primaryHeatingId] = await trx('primary_heating')
              .where({ heating_id: old_system_id })
              .pluck('heating_id');

            if (primaryHeatingId) {
              oldSystemIsPrimary = true;
            }

            //Delete the old heating system.
            await heating.del(old_system_id as any, trx);
          }

          await trx('restoration_events.heating_restoration_event').insert({
            event_id,
            old_system_id: oldSystemType,
            new_system_id,
          });

          //Create the replacement heating.
          await heating.create(
            { ...payload, is_primary: oldSystemIsPrimary, heating_type_id: new_system_id } as any,
            trx
          );
        }
        break;

      case event_targets.Katto:
        {
          const [roofId] = await trx('roof')
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
          const [ditchId] = await trx('drainage_ditch')
            .where({ property_id: payload.property_id })
            .pluck('property_id');

          if (ditchId) {
            await trx('drainage_ditch')
              .where({ property_id: ditchId })
              .update({
                ...filterValidColumns(payload, await getTableColumns('drainage_ditch', trx)),
                property_id: payload.property_id,
              });
          } else {
            await trx('drainage_ditch').insert({
              ...filterValidColumns(payload, await getTableColumns('drainage_ditch', trx)),
              property_id: payload.property_id,
            });
          }
        }
        break;

      case event_targets['Käyttövesiputket']:
        {
          await trx('restoration_events.water_pipe_restoration_event').insert({
            event_id,
            installation_method_id: payload.installation_method_id,
          });
        }
        break;

      case event_targets['Viemäriputket']:
        {
          await trx('restoration_events.sewer_pipe_restoration_event').insert({
            event_id,
            restoration_method_type_id: payload.restoration_method_type_id,
          });
        }
        break;

      case event_targets['Eristys']:
        {
          const promises = payload.insulation.map(async i => {
            await trx('insulation').insert({
              event_id,
              insulation_material_id: i.insulation_material_id,
              insulation_target_id: i.insulation_target_id,
            });
            await Promise.all(promises);
          });
        }
        break;

      case event_targets['Sähköt']:
        {
          await trx('restoration_events.electricity_restoration_event').insert({
            event_id,
            restoration_work_target_id: payload.restoration_work_target_id,
          });
        }
        break;

      case event_targets.Lukitus:
        {
          const { locks } = payload;
          const promises = locks.map(async l => {
            return trx('lock').insert({
              ...filterValidColumns(l, await getTableColumns('lock', trx)),
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
            trx('window').insert({
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
    const [{ result: event_targets }] = await trx('types.event_target_type').select(
      db.raw('json_object_agg(label, id) as result')
    );

    const { service_work_type_id, target_id } = payload;

    const insert = async (tablename: string) =>
      await trx(tablename).insert({
        service_work_type_id,
        event_id,
      });

    const event_target_id = parseInt(target_id as any);

    switch (event_target_id) {
      case event_targets['Ilmanvaihto']:
        {
          await insert('service_events.ventilation_service_event');
        }
        break;

      case event_targets['Lämmitysmuoto']:
        {
          await insert('service_events.heating_service_event');
        }
        break;

      case event_targets['Salaojat']:
        {
          await insert('service_events.drainage_ditch_service_event');
        }
        break;

      case event_targets['Lämmönjako']:
        {
          await insert('service_events.heating_distribution_service_event');
        }
        break;

      case event_targets['Katto']:
        {
          await insert('service_events.roof_service_event');
        }
        break;

      case event_targets['Ikkunat']:
        {
          await insert('service_events.window_service_event');
        }
        break;
    }
  }

  private async createCosmeticRenovationData(
    event_id: string,
    payload: Partial<EventPayloadType>,
    trx: Knex.Transaction
  ) {
    const promises = payload.surfaces?.map(s => {
      return trx('cosmetic_renovation_events.surfaces').insert({
        eventId: event_id,
        surfaceId: s,
      });
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
          ...filterValidColumns({ ...eventPayload }, await getTableColumns('event', trx)),
          id: event_id,
        });

        //Save the main event data.
        await trx('event').insert(insertData);

        const [{ result: event_types }] = await trx('types.event_type').select(
          db.raw('json_object_agg(label, id) as result')
        );
        const event_type_id = parseInt(eventPayload.event_type_id as any);

        //Create the additional data entries.
        switch (event_type_id) {
          case event_types.Peruskorjaus:
            {
              console.log('Adding restoration data..', eventPayload.insulation);
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
              await this.createCosmeticRenovationData(event_id, eventPayload, trx);
            }
            break;

          case event_types['Muu']:
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
      newQuery['object.id'] = query.id;
    }

    delete newQuery.id;

    const events = await db('object')
      .join('event', { 'event.id': 'object.id' })
      .leftJoin('types.event_target_type', { 'event.target_id': 'types.event_target_type.id' })

      .leftJoin('types.event_type', {
        'event.event_type_id': 'types.event_type.id',
      })

      .select(
        'object.*',
        'event.*',
        'types.event_target_type.label as targetLabel',

        'types.event_type.label as mainTypeLabel'
      )
      .where(function () {
        if (!search) return;
        const q = `%${search}%`;
        this.whereILike('object.title', q)
          .orWhereILike('object.description', q)
          .orWhereILike('types.event_type.label', q)
          .orWhereILike('types.event_target_type.label', q);
      })
      .andWhere(newQuery)
      .limit(limit)
      .offset(page * limit)
      .orderBy('event.date', 'desc');

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
    return await db('roof')
      .join('types.roof_type', { 'types.roof_type.id': 'roof.roofTypeId' })
      .join('types.roof_material_type', { 'types.roof_material_type.id': 'roof.roofMaterialId' })
      .join('ref_mainColors', { 'ref_mainColors.id': 'roof.colorId' })
      .join('types.roof_eaves_type', {
        'types.roof_eaves_type.id': 'roof.raystasTyyppiId',
      })
      .join('types.roof_fascia_board_type', {
        'types.roof_fascia_board_type.id': 'roof.otsalautaTyyppiId',
      })
      .join('types.roof_underlacing_type', {
        'types.roof_underlacing_type.id': 'roof.aluskateTyyppiId',
      })
      .where({ 'roof.event_id': eventId })
      .select(
        'types.roof_material_type.name as materialLabel',
        'types.roof_type.name as typeLabel',
        'ref_mainColors.name as colorLabel',
        'types.roof_eaves_type.label as raystasTyyppiLabel',
        'types.roof_fascia_board_type.label as otsalautaTyyppiLabel',
        'types.roof_underlacing_type.label as aluskateTyyppiLabel',
        'roof.*'
      );
  }

  private async getDrainageDitchEvent(eventId: string) {
    return await db('drainage_ditch')
      .join('restoration_events.drainage_ditch_implementation_method_type', {
        'restoration_events.drainage_ditch_implementation_method_type.id':
          'drainage_ditch.toteutusTapaId',
      })
      .where({ 'drainage_ditch.event_id': eventId })
      .select(
        'drainage_ditch.*',
        'restoration_events.drainage_ditch_implementation_method_type.label as toteutusTapaLabel'
      );
  }

  private async getHeatingEvent(eventId: string) {
    const [newSystemId] = await db('data_baseHeatingEvents')
      .where({ id: eventId })
      .pluck('newSystemId');

    const heatingTypes = await db('types.heating_type');

    const query = db('data_baseHeatingEvents')
      .join('types.heating_type as oldSystem', {
        'oldSystem.id': 'data_baseHeatingEvents.oldSystemId',
      })
      .join('types.heating_type as newSystem', {
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
    return await db('restoration_events.sewer_pipe_restoration_event')
      .join('restoration_events.water_pipe_installation_method_type', {
        'restoration_events.water_pipe_installation_method_type.id':
          'restoration_events.sewer_pipe_restoration_event.installation_method_id',
      })
      .where({ 'restoration_events.sewer_pipe_restoration_event.event_id': eventId })
      .select(
        'restoration_events.sewer_pipe_restoration_event.*',
        'restoration_events.water_pipe_installation_method_type.label as asennustapaLabel'
      );
  }

  private async getSewegeEvent(eventId: string) {
    return await db('restoration_events.sewer_pipe_restoration_event')
      .join('restoration_events.sewer_pipe_restoration_method_type', {
        'restoration_events.sewer_pipe_restoration_method_type.id':
          'restoration_events.sewer_pipe_restoration_event.restoration_method_type_id',
      })
      .where({ 'restoration_events.sewer_pipe_restoration_event.event_id': eventId })
      .select(
        'restoration_events.sewer_pipe_restoration_event.*',
        'restoration_events.sewer_pipe_restoration_method_type.label as Toteutustapa'
      );
  }

  private async getInsulationEvent(eventId: string) {
    return await db('restoration_events.insulation_restoration_event')
      .join('insulation.targets', {
        'insulation.targets.id':
          'restoration_events.insulation_restoration_event.insulation_target_id',
      })
      .join('insulation.materials', {
        'insulation.materials.id':
          'restoration_events.insulation_restoration_event.insulation_material_id',
      })
      .where({ 'restoration_events.insulation_restoration_event.event_id': eventId })
      .select(
        'restoration_events.insulation_restoration_event.*',
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
    return await db('lock')
      .join('types.lock_type', { 'types.lock_type.id': 'lock.lock_type_id' })
      .where({ 'lock.id': eventId })
      .select('lock.*', 'types.lock_type.label as Lukon tyyppi');
  }

  /**Fetches the additional data associated with an event
   * @param eventId The id of the event to fetch additional data for.
   * @returns An array containing the extra data.
   * @throws An error if the event has a main type, or target id, for which no functionality is implemented yet.
   * @deprecated
   */
  async getExtraData(eventId: string) {
    const [type_data] = await db('event')
      .where({ id: eventId })
      .select('event_type_id', 'target_id', 'workTypeId');
    const mainTypes = await db('types.event_type');

    if (type_data.event_type_id == getIdByLabel(mainTypes, 'Peruskorjaus')) {
      const targets = await db('types.event_target_type');

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
   * @param payload The main event data to update with.
   */
  async update(id: string, payload: Partial<EventPayloadType>) {
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
    const [timestamp] = await db('event')
      .join('object', { 'object.id': 'event.id' })
      .where({ 'event.id': eventId })
      .select('object.timestamp');

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
