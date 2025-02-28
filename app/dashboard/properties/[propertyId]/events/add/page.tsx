import { EventForm } from '../../../../../../features/events/components/AddEventForm/EventForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';

import { EventTypeProvider } from '../../../../../../features/events/components/AddEventForm/EventTypeProvider';
import { getEventRefs } from '../../../../../../features/events/utils/getEventRefs';
import { properties } from 'kotilogi-app/features/properties/DAL/properties';

export default async function AddEventPage({ params }) {
  await verifySession();
  const { propertyId } = await params;
  await properties.verifyEventCount(propertyId);

  const refs = await getEventRefs();

  return (
    <main className='flex justify-center min-h-[calc(2 * 100vh)]'>
      <div className='xs:w-full xl:w-[90%]'>
        <EventTypeProvider refs={refs}>
          <EventForm propertyId={propertyId} />
        </EventTypeProvider>
      </div>
    </main>
  );
}
