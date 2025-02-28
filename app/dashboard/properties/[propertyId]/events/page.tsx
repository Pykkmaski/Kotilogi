import { EventBoxList } from '../../../../../features/events/components/EventBoxList';
import { events } from 'kotilogi-app/features/events/DAL/events';
import React from 'react';
import { EventPageSelector } from '../../../../../features/events/components/EventPageSelector';
import { EventPayloadType } from 'kotilogi-app/features/events/types/EventPayloadType';

export default async function EventsPage({ params, searchParams }) {
  const { propertyId } = await params;
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

  const totalEvents = await events.countEvents({ property_id: propertyId }, q);
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
