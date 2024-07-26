import { Main } from '@/components/New/Main';
import { EventForm } from './_components/EventForm';
import { FileUploadForm } from '@/components/New/FileUploadForm';

export default async function AddEventPage({ params }) {
  return (
    <Main>
      <EventForm propertyId={params.propertyId} />
    </Main>
  );
}
