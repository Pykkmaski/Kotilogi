import db from 'kotilogi-app/dbconfig';
import { EventForm } from '../../add/_components/EventForm';
import { Main } from '@/components/New/Main';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { EventTypeProvider } from '../../add/_components/EventTypeProvider';
import { getEventRefs } from '../../add/_utils/getEventRefs';
import { events } from 'kotilogi-app/dataAccess/events';
import { objects } from 'kotilogi-app/dataAccess/objects';

export default async function EditEventPage({ params }) {
  const session = await loadSession();
  if (!session) {
    redirect('/login');
  }

  const [event] = await events.get({ id: params.eventId });
  //For some reason, the day drops by one when it is read. Increment it by one.
  event.date.setDate(event.date.getDate() + 1);

  const [extraData] = await events.getExtraData(event.id);

  let allowed;
  try {
    await objects.verifySessionUserIsAuthor(event.id);
    allowed = true;
  } catch (err) {
    allowed = false;
  }

  const refs = await getEventRefs();
  return (
    <main className='flex justify-center'>
      {(allowed && (
        <EventTypeProvider refs={refs}>
          <EventForm
            eventData={event}
            initialExtraData={extraData}
            propertyId={event.parentId}
          />
        </EventTypeProvider>
      )) || <span>Vain tapahtuman laatija voi muokata sitä!</span>}
    </main>
  );
}
