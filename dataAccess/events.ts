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
import { exteriorCladding } from './exteriorCladding';
import { EventType } from 'kotilogi-app/types/EventType';
import { TargetType } from 'kotilogi-app/types/TargetType';
import { verifySession } from 'kotilogi-app/utils/verifySession';

class Events {
  /**
   * Creates a data-transform-object of an event. Creates a title based on the types of an event, if an actual title is not defined.
   * @param eventData
   * @returns
   */
  private getDTO(eventData: TODO) {
    const labels = [eventData.event_type, eventData.target_type].filter(t => t != null);

    const title = labels.length ? labels.join(' > ') : eventData.title || 'Ei Otsikkoa.';
    const description = eventData.description || eventData.workTypeLabel;

    return {
      ...eventData,
      id: eventData.id,
      parentId: eventData.parentId,
      title,
      description,
      date: eventData.date,
      /**@deprecated */
      mainTypeLabel: eventData.event_type,
      targetLabel: eventData.target_type,
      workTypeLabel: eventData.workTypeLabel,
      workTypeId: eventData.workTypeId,
      labourExpenses: eventData.labourExpenses,
      materialExpenses: eventData.materialExpenses,
    } as unknown as EventPayloadType;
  }

  /**Inserts restoration event data, under the restoration_events-schema.
   * @deprecated
   */
  private async createRestorationWorkData(
    event_id: string,
    payload: EventPayloadType,
    trx: Knex.Transaction
  ) {
    const [{ result: event_targets }] = (await trx('types.event_target_type').select(
      db.raw('json_object_agg(label, id) as result')
    )) as TODO;

    const event_target_id = parseInt(payload.target_type as any);

    switch (event_target_id) {
      case event_targets['Ulkoverhous']:
        {
          await exteriorCladding.create(event_id, payload, trx);
        }
        break;

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
          `Received an event with target id ${payload.target_type}, but no logic for inserting specific event data exists. Make sure this is intentional.`
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
      event_type_id: data.event_type,
      target_id: (data.target_type as any) == -1 ? null : data.target_type,
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

  /**@deprecated */
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
    const session = await verifySession();
    //Save the main event data.
    await db('new_events').insert({
      event_type: eventPayload.event_type,
      target_type: eventPayload.target_type,
      title: eventPayload.title,
      description: eventPayload.description,
      date: eventPayload.date,
      labour_expenses: eventPayload.labour_expenses,
      author_id: session.user.id,
      property_id: eventPayload.property_id,
      data: eventPayload.data,
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
      property_id: query.parentId,
    };

    let totalEvents, eventsOnCurrentPage;
    if (query.parentId) {
      [{ result: totalEvents }] = (await db('new_events')
        .where({ property_id: query.parentId })
        .andWhereNot({ event_type: 'Genesis' })
        .count('* as result')) as [{ result: number }];

      eventsOnCurrentPage = page * limit <= totalEvents ? limit : totalEvents % limit;
    }

    //Do this more elegantly later. There is no parentId in the new_events-table.
    delete newQuery.parentId;
    const events = await db('new_events')
      .where(function () {
        if (!search) return;
        const q = `%${search}%`;
        this.whereILike('title', q)
          .orWhereILike('description', q)
          .orWhereILike('event_type', q)
          .orWhereILike('target_type', q);
      })
      .andWhere(newQuery)
      .andWhereNot({ event_type: 'Genesis' })
      .limit(eventsOnCurrentPage)
      .offset(page * limit)
      .orderBy('date', 'desc', 'last');
    return events.map(e => this.getDTO(e));
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
