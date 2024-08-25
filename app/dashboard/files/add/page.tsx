import { FileUploadForm } from '@/components/New/FileUploadForm';
import { Main } from '@/components/New/Main';

export default async function AddFilesPage({ searchParams }) {
  const parentId = searchParams?.parentId;
  return (
    <Main>
      <FileUploadForm fileParentId={parentId} />
    </Main>
  );
}
