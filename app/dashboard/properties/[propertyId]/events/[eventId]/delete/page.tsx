import { ADeletePropertyEvent } from '@/actions/events';
import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { DeleteEventForm } from './_components/DeleteEventForm';

export default async function DeleteEventPage({ params }) {
  const session = await loadSession();
  const { eventId, propertyId } = params;
  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': eventId });
  const [authorId] = await db('data_objects').where({ id: eventId }).pluck('authorId');
  const deletionAllowed = authorId == session.user.id;

  return (
    <Main>
      <DeleteEventForm event={event} />
    </Main>
  );
}
