import { Main } from '@/components/New/Main';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { getEvents } from 'kotilogi-app/dataAccess/events/getEvents';
import { EventCardGrid } from './_components/EventCardGrid';
import { EventBoxList } from './_components/EventBoxList';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;

  const events = (await getEvents({ parentId: propertyId }, search, 10)) as EventDataType[];

  return (
    <Main>
      <EventBoxList
        search={search}
        events={events}
        propertyId={propertyId}
      />
    </Main>
  );
}
