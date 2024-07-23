import { ADeletePropertyEvent } from '@/actions/events';
import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { DeleteEventForm } from './_components/DeleteEventForm';

export default async function DeleteEventPage({ params }) {
  const session = await loadSession();
  const { eventId, propertyId } = params;
  const [event] = await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
    .where({ 'propertyEventData.id': eventId });
  const [authorId] = await db('objectData').where({ id: eventId }).pluck('authorId');
  const deletionAllowed = authorId == session.user.id;

  return (
    <Main>
      {deletionAllowed ? (
        <DeleteEventForm event={event} />
      ) : (
        <span>Tapahtumaa ei voi poistaa, sillä et ole sen laatija!</span>
      )}
    </Main>
  );
}
