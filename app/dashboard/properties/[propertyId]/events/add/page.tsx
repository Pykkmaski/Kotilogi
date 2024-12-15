import { EventForm } from './_components/EventForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';

import { EventTypeProvider } from './_components/EventTypeProvider';
import { getEventRefs } from './_utils/getEventRefs';
import { properties } from 'kotilogi-app/dataAccess/properties';

export default async function AddEventPage({ params }) {
  await verifySession();
  await properties.verifyEventCount(params.propertyId);

  const refs = await getEventRefs();

  return (
    <main className='flex justify-center'>
      <div className='xs:w-full lg:w-[70%]'>
        <EventTypeProvider refs={refs}>
          <EventForm propertyId={params.propertyId} />
        </EventTypeProvider>
      </div>
    </main>
  );
}
