import { Main } from '@/components/New/Main';
import { EventForm } from './_components/EventForm';

export default async function AddEventPage({ params }) {
  return (
    <Main>
      <EventForm propertyId={params.propertyId} />
    </Main>
  );
}
