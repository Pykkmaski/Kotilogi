import { FileUploadForm } from '@/components/New/FileUploadForm';
import { Main } from '@/components/New/Main';

export default async function AddFilesPage({ params }) {
  const propertyId = params.propertyId;
  return (
    <Main>
      <FileUploadForm fileParentId={propertyId} />
    </Main>
  );
}
