import { Knex } from 'knex';
import { objects } from './objects';
import { EventPayloadType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { properties } from './properties';
import { heating } from './heating';
import { roofs } from './roofs';

import { waterPipes } from './waterPipes';
import { insulation } from './insulation';

import { locks } from './locks';
import { sewerPipes } from './sewerPipes';
import { electricity } from './electricity';
import { ventilation } from './ventilation';
import { firealarms } from './firealarms';
import { drainageDitches } from './drainageDitches';
import { structures } from './structures';
import { windows } from './windows';

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
      ...eventData,
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
    } as unknown as EventPayloadType;
  }

  /**Inserts restoration event data, under the restoration_events-schema. */
  private async createRestorationWorkData(
    event_id: string,
    payload: EventPayloadType,
    trx: Knex.Transaction
  ) {
    const [{ result: event_targets }] = (await trx('types.event_target_type').select(
      db.raw('json_object_agg(label, id) as result')
    )) as TODO;

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
          const promises = payload.electricalTargets.map(async t => {
            await trx('restoration_events.electricity_restoration_event').insert({
              event_id,
              restoration_work_target_id: t,
            });
          });

          await Promise.all(promises);
        }
        break;

      case event_targets.Lukitus:
        {
          const { locks: lockData } = payload;
          await locks.create(event_id, lockData, trx);
        }
        break;

      case event_targets['Ikkunat']:
        {
          const { windows: windowData } = payload;
          await windows.create(event_id, windowData, trx);
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
    const [{ result: event_targets }] = (await trx('types.event_target_type').select(
      db.raw('json_object_agg(label, id) as result')
    )) as TODO;

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

      case event_targets['Palovaroittimet']:
        {
          await insert('service_events.firealarm_service_event');
        }
        break;

      /*
      case event_targets['Muu']:
        {
          await insert('service_events.other_service_event');
        }
        break;*/

      case event_targets['Viemäriputket']:
        {
          await insert('service_events.sewer_pipe_service_event');
        }
        break;

      case event_targets['Käyttövesiputket']:
        {
          await insert('service_events.water_pipe_service_event');
        }
        break;

      case event_targets['Rakenteet']:
        {
          await insert('service_events.structure_service_event');
        }
        break;

      case event_targets['Eristys']:
        {
          await insert('service_events.insulation_service_event');
        }
        break;

      case event_targets['Sähköt']:
        {
          await insert('service_events.electricity_service_event');
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

        const [{ result: event_types }] = (await trx('types.event_type').select(
          db.raw('json_object_agg(label, id) as result')
        )) as TODO;
        const event_type_id = parseInt(eventPayload.event_type_id as any);

        //Create the additional related data entries.
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

    let totalEvents, eventsOnCurrentPage;
    if (query.parentId) {
      [{ result: totalEvents }] = (await db('event')
        .join(db.raw('object on object.id = event.id'))
        .where({ 'object.parentId': query.parentId })
        .count('* as result')) as [{ result: number }];

      eventsOnCurrentPage = page * limit <= totalEvents ? limit : totalEvents % limit;
    }

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
      .limit(eventsOnCurrentPage)
      .offset(page * limit)
      .orderBy('event.date', 'desc');

    return await Promise.all(
      events
        .filter(e => {
          return (
            e.workTypeLabel?.includes(search) ||
            e.mainTypeLabel?.includes(search) ||
            e.targetLabel?.includes(search) ||
            true
          );
        })
        .map(async e => {
          //Get the event types.
          const [{ result: eventTypes }] = (await db('types.event_type').select(
            db.raw('json_object_agg(label, id) as result')
          )) as TODO;

          //Get the event targets.
          const [{ result: targets }] = (await db('types.event_target_type').select(
            db.raw('json_object_agg(label, id) as result')
          )) as TODO;

          const { event_type_id, target_id } = e;
          let modifiedEvent = e;

          //Modify the event returned to include any additional data.
          //Restoration data
          if (event_type_id == eventTypes['Peruskorjaus']) {
            if (target_id == targets['Lämmitysmuoto']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await heating.getRestorationData(modifiedEvent.id)),
              };
            } else if (target_id == targets['Eristys']) {
              modifiedEvent = {
                ...modifiedEvent,
                insulation: await insulation.get(modifiedEvent.id),
              };
            } else if (target_id == targets['Käyttövesiputket']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await waterPipes.getRestorationData(modifiedEvent.id)),
              };
            } else if (target_id == targets['Viemäriputket']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await sewerPipes.getRestorationData(modifiedEvent.id)),
              };
            } else if (target_id == targets['Sähköt']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await electricity.getRestorationData(modifiedEvent.id)),
              };
            } else if (target_id == targets['Lukitus']) {
              modifiedEvent = {
                ...modifiedEvent,
                locks: await locks.get(modifiedEvent.id),
              };
            } else if (target_id == targets['Ikkunat']) {
              modifiedEvent = {
                ...modifiedEvent,
                windows: await windows.get(modifiedEvent.id),
              };
            }
          }
          //Service data
          else if (event_type_id == eventTypes['Huoltotyö']) {
            //Heating
            if (target_id == targets['Lämmitysmuoto']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await heating.getServiceData(modifiedEvent.id)),
              };
            }
            //Insulation
            else if (target_id == targets['Eristys']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await insulation.getServiceData(modifiedEvent.id)),
              };
            }
            //Water pipes
            else if (target_id == targets['Käyttövesiputket']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await waterPipes.getServiceData(modifiedEvent.id)),
              };
            }
            //Sewer pipes
            else if (target_id == targets['Viemäriputket']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await sewerPipes.getServiceData(modifiedEvent.id)),
              };
            }
            //Ventilation
            else if (target_id == targets['Ilmanvaihto']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await ventilation.getServiceData(modifiedEvent.id)),
              };
            }
            //Firealarms
            else if (target_id == targets['Palovaroittimet']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await firealarms.getServiceData(modifiedEvent.id)),
              };
            }
            //Drainage ditches
            else if (target_id == targets['Salaojat']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await drainageDitches.getServiceData(modifiedEvent.id)),
              };
            }
            //Roof
            else if (target_id == targets['Katto']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await roofs.getServiceData(modifiedEvent.id)),
              };
            }
            //Structures
            else if (target_id == targets['Rakenteet']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await structures.getServiceData(modifiedEvent.id)),
              };
            }
            //Windows
            else if (target_id == targets['Ikkunat']) {
              modifiedEvent = {
                ...modifiedEvent,
                ...(await windows.getServiceData(modifiedEvent.id)),
              };
            }
          }
          return this.getDTO(modifiedEvent);
        })
    );
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
