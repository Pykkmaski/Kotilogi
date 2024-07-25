import db from 'kotilogi-app/dbconfig';
import { EventForm } from '../../add/_components/EventForm';
import { Main } from '@/components/New/Main';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export default async function EditEventPage({ params }) {
  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': params.eventId });

  const session = await loadSession();
  if (event.authorId != session.user.id)
    throw new Error('Sinulla ei ole tämän tapahtuman muokkausoikeutta!');

  return (
    <Main>
      <EventForm
        eventData={event}
        propertyId={event.parentId}
      />
    </Main>
  );
}
