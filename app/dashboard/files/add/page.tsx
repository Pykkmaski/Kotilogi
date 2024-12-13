import { FileUploadForm } from '@/components/New/FileUploadFom/FileUploadForm';
import { Main } from '@/components/New/Main';
import { BoxFieldset } from '@/components/UI/Fieldset';

export default async function AddFilesPage({ searchParams }) {
  const parentId = searchParams?.parentId;
  return (
    <main className='flex justify-center'>
      <div className='lg:w-[70%] xs:w-full'>
        <BoxFieldset legend='Lisää kuvia ja tiedostoja'>
          <div className='w-full flex'>
            <FileUploadForm fileParentId={parentId} />
          </div>
        </BoxFieldset>
      </div>
    </main>
  );
}
