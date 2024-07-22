import db from 'kotilogi-app/dbconfig';
import { EventForm } from '../../add/_components/EventForm';
import { Main } from '@/components/New/Main';

export default async function EditEventPage({ params }) {
  const [event] = await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
    .where({ 'propertyEventData.id': params.eventId });

  return (
    <Main>
      <EventForm
        eventData={event}
        propertyId={event.parentId}
      />
    </Main>
  );
}
