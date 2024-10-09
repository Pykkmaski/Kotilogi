import db from 'kotilogi-app/dbconfig';
import { EventForm } from '../../add/_components/EventForm';
import { Main } from '@/components/New/Main';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { verifySessionUserIsAuthor } from 'kotilogi-app/dataAccess/utils/verifySessionUserIsAuthor';
import { EventTypeProvider } from '../../add/_components/EventTypeProvider';
import { getEventRefs } from '../../add/_utils/getEventRefs';
import { getExtraEventData } from 'kotilogi-app/dataAccess/events';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

export default async function EditEventPage({ params }) {
  const session = await loadSession();
  if (!session) {
    redirect('/login');
  }

  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': params.eventId });
  //For some reason, the day drops by one every time it is read. Increment it by one.
  event.date.setDate(event.date.getDate() + 1);

  const [extraData] = await getExtraEventData(event.id);

  let allowed;
  try {
    await verifySessionUserIsAuthor(event.id);
    allowed = true;
  } catch (err) {
    allowed = false;
  }
  //console.log(timestampToISOString(event.date.getTime()));
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
