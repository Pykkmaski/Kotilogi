import { Main } from '@/components/New/Main';
import { EventForm } from './_components/EventForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { verifyPropertyEventCount } from 'kotilogi-app/dataAccess/events';

export default async function AddEventPage({ params }) {
  await verifySession();
  await verifyPropertyEventCount(params.propertyId);

  return (
    <Main>
      <EventForm propertyId={params.propertyId} />
    </Main>
  );
}
