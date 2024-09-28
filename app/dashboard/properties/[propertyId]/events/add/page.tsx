import { Main } from '@/components/New/Main';
import { EventForm } from './_components/EventForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { verifyPropertyEventCount } from 'kotilogi-app/dataAccess/events';
import db from 'kotilogi-app/dbconfig';
import { EventTypeProvider } from './_components/EventTypeProvider';
import { getEventRefs } from './_utils/getEventRefs';

export default async function AddEventPage({ params }) {
  await verifySession();
  await verifyPropertyEventCount(params.propertyId);

  const refs = await getEventRefs();

  return (
    <main className='flex justify-center'>
      <EventTypeProvider refs={refs}>
        <EventForm propertyId={params.propertyId} />
      </EventTypeProvider>
    </main>
  );
}
