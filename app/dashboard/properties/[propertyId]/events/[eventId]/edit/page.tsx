import { events } from 'kotilogi-app/dataAccess/events';
import { EventForm } from '../../add/_components/EventForm';
import { EventTypeProvider } from '../../add/_components/EventTypeProvider';
import { getEventRefs } from '../../add/_utils/getEventRefs';
import { objects } from 'kotilogi-app/dataAccess/objects';

export default async function EditEventPage({ params }) {
  const { eventId, propertyId } = await params;
  const [event] = (await events.get({ id: eventId })) as [TODO];
  //TODO: Prevent editing by non-authors.

  const refs = await getEventRefs();
  return (
    <main className='flex justify-center min-h-[calc(2 * 100vh)]'>
      <div className='xs:w-full xl:w-[90%]'>
        <EventTypeProvider refs={refs}>
          <EventForm
            initialEventData={event}
            propertyId={propertyId}
          />
        </EventTypeProvider>
      </div>
    </main>
  );
}
