import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { EventBoxList } from './_components/EventBoxList';
import { events } from 'kotilogi-app/dataAccess/events';
import React from 'react';
import { EventPageSelector } from './_components/EventPageSelector';
import db from 'kotilogi-app/dbconfig';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = await params.propertyId;
  const { q, page } = (await searchParams) as {
    q: string;
    page: string;
  };
  const currentPage = page && parseInt(page);
  const eventData = (await events.get(
    { parentId: propertyId },
    q,
    10,
    currentPage
  )) as EventPayloadType[];

  const [{ result: totalEvents }] = (await db('event')
    .join(db.raw('object on object.id = event.id'))
    .join(db.raw('types.event_type on types.event_type.id = event.event_type_id'))
    .join(db.raw('types.event_target_type on types.event_target_type.id = event.target_id'))
    .where(function () {
      if (!q) {
        return;
      }

      const qstr = `%${q}%`;
      this.whereILike('object.title', qstr)
        .orWhereILike('object.description', qstr)
        .orWhereILike('types.event_type.label', qstr)
        .orWhereILike('types.event_target_type.label', qstr);
    })
    .andWhere({ 'object.parentId': propertyId })
    .count('* as result')) as [{ result: number }];

  const maxPages = Math.ceil(totalEvents / 10);

  return (
    <main className='flex justify-center w-full'>
      <div
        id='events-page-body'
        className='flex flex-col gap-4 lg:w-[75%] xs:w-full'>
        <EventBoxList
          search={q}
          events={eventData}
          propertyId={propertyId}
          currentPage={currentPage || 0}
          maxPages={maxPages}
        />
        <EventPageSelector
          currentPage={currentPage || 0}
          maxPages={maxPages}
          q={q}
        />
      </div>
    </main>
  );
}
