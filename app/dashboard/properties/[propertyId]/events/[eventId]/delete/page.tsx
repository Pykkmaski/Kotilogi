import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { DeleteEventForm } from './_components/DeleteEventForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { verifySessionUserIsAuthor } from 'kotilogi-app/dataAccess/utils/verifySessionUserIsAuthor';

export default async function DeleteEventPage({ params }) {
  const { eventId } = params;
  await verifySessionUserIsAuthor(eventId);

  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': eventId });

  return (
    <Main>
      <DeleteEventForm event={event} />
    </Main>
  );
}
