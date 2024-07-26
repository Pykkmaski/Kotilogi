import { FileUploadForm } from '@/components/New/FileUploadForm';
import { Main } from '@/components/New/Main';

export default async function AddFilesPage({ params }) {
  const eventId = params.eventId;
  return (
    <Main>
      <FileUploadForm fileParentId={eventId} />
    </Main>
  );
}
