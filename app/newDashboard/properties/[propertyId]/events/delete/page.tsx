import db from 'kotilogi-app/dbconfig';
import { DeleteEventForm } from '../[eventId]/delete/_components/DeleteEventForm';
import { Main } from '@/components/New/Main';

export default async function DeleteEventPage({ params }) {
  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ id: params.eventId });

  return (
    <Main>
      <DeleteEventForm event={event} />
    </Main>
  );
}
