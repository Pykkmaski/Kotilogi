import db from 'kotilogi-app/dbconfig';
import { EventForm } from '../../add/_components/EventForm';
import { Main } from '@/components/New/Main';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { verifySessionUserIsAuthor } from 'kotilogi-app/dataAccess/utils/verifySessionUserIsAuthor';
import { EventTypeProvider } from '../../add/_components/EventTypeProvider';
import { getEventRefs } from '../../add/_utils/getEventRefs';

export default async function EditEventPage({ params }) {
  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': params.eventId });

  const session = await loadSession();
  if (!session) {
    redirect('/login');
  }

  let allowed;
  try {
    await verifySessionUserIsAuthor(event.id);
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
            propertyId={event.parentId}
          />
        </EventTypeProvider>
      )) || <span>Vain tapahtuman laatija voi muokata sitä!</span>}
    </main>
  );
}
