import { Main } from '@/components/New/Main';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { EventBoxList } from './_components/EventBoxList';
import { events } from 'kotilogi-app/dataAccess/events';
import { ListHeader } from '@/components/New/Prefabs/OverviewBoxList';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;

  const eventData = (await events.get({ parentId: propertyId }, search, 10)) as EventPayloadType[];

  return (
    <main className='flex justify-center w-full'>
      <div
        id='events-page-body'
        className='lg:w-[75%] xs:w-full'>
        <EventBoxList
          search={search}
          events={eventData}
          propertyId={propertyId}
        />
      </div>
    </main>
  );
}
