import { objects } from '../../../dataAccess/objects';
import { EventPayloadType } from '../types/EventPayloadType';
import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { properties } from '../../properties/DAL/properties';
import { Knex } from 'knex';
import { eventSchema } from '../schemas/eventSchema';
import { KDError, UserError } from 'kotilogi-app/utils/error';

class Events {
  /**
   * Creates a data-transform-object of an event.
   * Creates a title based on the types of an event, if an actual title is not defined.
   * @param eventData
   * @returns
   */
  private getDTO(eventData: TODO) {
    const labels = [eventData.event_type, eventData.target_type].filter(t => t != null);
    const title = labels.length ? labels.join(' > ') : eventData.title || 'Ei Otsikkoa.';
    const dto = {
      ...eventData,
      title,
    } as unknown as EventPayloadType;

    if (dto.data) {
      delete dto.data._schemaVersion;
    }

    return dto;
  }

  /**Returns the total number of events a property has. */
  async countEvents(query: TODO, search: string | null = null, ctx: Knex | Knex.Transaction = db) {
    const [{ eventCount }] = await ctx('new_events')
      .where(function () {
        if (!search) {
          return;
        }
        const qstr = `%${search}%`;
        this.whereILike('title', qstr)
          .orWhereILike('description', qstr)
          .orWhereILike('event_type', qstr)
          .orWhereILike('target_type', qstr);
      })
      .andWhere(query)
      .andWhereNot({ event_type: 'Genesis' })
      .count('*', { as: 'eventCount' });
    return typeof eventCount == 'string' ? parseInt(eventCount) : eventCount;
  }

  /**Creates a new event for a property.
   * @param payload The event data to be inserted.
   * @param ctx An optional database transaction instance to use.
   */
  async create(payload: EventPayloadType, ctx?: Knex.Transaction) {
    const result: { code?: string | number; data: string } = {
      code: 0,
      data: null,
    };

    //Verify the user has not hit the property's event-limit.
    if (process.env.NODE_ENV === 'production') {
      try {
        await properties.verifyEventCount(payload.property_id);
      } catch (err) {
        result.code = KDError.LIMIT_HIT;
        return result;
      }
    }

    await objects.create(async (obj, trx) => {
      payload.id = obj.id;
      payload.date = new Date(payload.date);
      console.log(payload);
      payload = eventSchema.parse(payload);
      await trx('new_events').insert(payload);
    }, ctx);
    result.data = payload.id;
    return result;
  }

  /**
   * Fetches events from the database.
   * @param query The knex query-object to use.
   * @param search An optional search-string with which to filter the results based on the title, description, main type, target or work type labels.
   * @param limit An optional limit to how many results are returned. Defaults to 10.
   * @param page An optional page number to offset the results by. Defaults to 0 (The first page).
   * @returns An array of found events.
   */
  async get(query: TODO, search?: string, limit: number = 10, page: number = 0) {
    const { property_id } = query;
    let totalEvents: number, eventsOnCurrentPage: number;
    if (property_id) {
      totalEvents = await this.countEvents({ property_id }, null, db);
      eventsOnCurrentPage = page * limit <= totalEvents ? limit : totalEvents % limit;
    }

    const events = await db('new_events')
      .where(function () {
        if (!search) return;
        const q = `%${search}%`;
        this.whereILike('title', q)
          .orWhereILike('description', q)
          .orWhereILike('event_type', q)
          .orWhereILike('target_type', q);
      })
      .andWhere(query)
      .andWhereNot({ event_type: 'Genesis' })
      .limit(eventsOnCurrentPage)
      .offset(page * limit)
      .orderBy('date', 'desc', 'last');
    return (
      events
        .map(e => this.getDTO(e))
        //Get rid of null values in columns, but skip the data-column.
        .map(e => {
          const nullsParsed = Object.entries(e).filter(([key, value]) => {
            if (key !== 'data') {
              return value !== null;
            }
            return true;
          });
          return Object.fromEntries(nullsParsed);
        })
    );
  }

  /**Updates the main event data.
   * @param id The id of the event to update.
   * @param payload The main event data to update with.
   * @todo
   */
  async update(
    id: string,
    payload: Partial<EventPayloadType>
  ): Promise<{ code?: string | number }> {
    const result: { code: string | number } = {
      code: 0,
    };

    //Only allow the author of an event to update it.
    try {
      await objects.verifySessionUserIsAuthor(id, db);
    } catch (err) {
      result.code = UserError.NOT_OWNER;
      return result;
    }

    console.log(payload);
    const parsedPayload = eventSchema.parse({
      property_id: payload.property_id,
      event_type: payload.event_type,
      target_type: payload.target_type,
      title: payload.title,
      description: payload.description,
      material_expenses: payload.material_expenses,
      labour_expenses: payload.labour_expenses,
      date: payload.date,
      data: payload.data,
    });

    await db('new_events').where({ id }).update(parsedPayload);
    result.code = 0;
    return result;
  }

  /**Deletes an event. Throws an error if the logged in user is not the author of the event, or if the event is locked.
   * @param id The id of the event to delete.
   */
  async del(id: string) {
    //Only allow the author of the event to delete it.
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
