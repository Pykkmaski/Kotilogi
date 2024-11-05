import { FileUploadForm } from '@/components/New/FileUploadFom/FileUploadForm';
import { Main } from '@/components/New/Main';

export default async function AddFilesPage({ searchParams }) {
  const parentId = searchParams?.parentId;
  return (
    <main className='flex justify-center'>
      <FileUploadForm fileParentId={parentId} />
    </main>
  );
}
