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
    { property_id: propertyId },
    q,
    10,
    currentPage
  )) as EventPayloadType[];

  const [{ result: totalEvents }] = (await db('new_events')
    .where(function () {
      if (!q) {
        return;
      }
      const qstr = `%${q}%`;
      this.whereILike('title', qstr)
        .orWhereILike('description', qstr)
        .orWhereILike('event_type', qstr)
        .orWhereILike('target_type', qstr);
    })
    .andWhere({ property_id: propertyId })
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
