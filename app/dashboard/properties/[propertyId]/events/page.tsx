import { Main } from '@/components/New/Main';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventBoxList } from './_components/EventBoxList';
import { events } from 'kotilogi-app/dataAccess/events';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;

  const eventData = (await events.get({ parentId: propertyId }, search, 10)) as EventDataType[];

  return (
    <Main>
      <EventBoxList
        search={search}
        events={eventData}
        propertyId={propertyId}
      />
    </Main>
  );
}
