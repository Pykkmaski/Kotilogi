import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { DeleteEventForm } from '../../../../../../../features/events/components/DeleteEventForm';
import { objects } from 'kotilogi-app/dataAccess/objects';

export default async function DeleteEventPage({ params }) {
  const { eventId } = params;
  await objects.verifySessionUserIsAuthor(eventId, db);

  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': eventId });

  return (
    <main className='flex items-center'>
      <DeleteEventForm event={event} />
    </main>
  );
}
