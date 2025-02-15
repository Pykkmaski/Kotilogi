import { objects } from './objects';
import { EventPayloadType } from './types';
import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { properties } from './properties';

import { verifySession } from 'kotilogi-app/utils/verifySession';
import { Knex } from 'knex';

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

  /**Creates a new event for a property.
   * @param eventData The main event data, containing its title, description, etc.
   * @param type_data The data containing the main type id, id of the target the event refers to, and optionally the id of the work type.
   * @param extraData The additional data to include with the main data.
   * @param selectedSurfaceIds The ids of the surfaces the event refers to. Used only for surface renovation events (Pintaremontti).
   * @param callback An optional callback function to run before commiting the data.
   */
  async create(eventPayload: EventPayloadType, ctx?: Knex.Transaction) {
    await properties.verifyEventCount(eventPayload.property_id);
    //Save the main event data.
    let eventId: string;
    await objects.create(async (obj, trx) => {
      await trx('new_events').insert({
        id: obj.id,
        event_type: eventPayload.event_type,
        target_type: eventPayload.target_type,
        description: eventPayload.description,
        date: eventPayload.date,
        labour_expenses: eventPayload.labour_expenses,
        property_id: eventPayload.property_id,
        data: eventPayload.data,
      });
      eventId = obj.id;
    }, ctx);
    return eventId;
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
    const { property_id } = query;
    let totalEvents, eventsOnCurrentPage;
    if (property_id) {
      [{ result: totalEvents }] = (await db('new_events')
        .where({ property_id })
        .andWhereNot({ event_type: 'Genesis' })
        .count('* as result')) as [{ result: number }];

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
    const session = await verifySession();
    const [author_id] = await db('new_events').where({ id }).pluck('author_id');
    if (author_id !== session.user.id) {
      throw new Error('Tapahtuman voi poistaa ainoastaan sen laatija!');
    }
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
