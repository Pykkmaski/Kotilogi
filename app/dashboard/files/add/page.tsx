import { FileUploadForm } from '@/components/New/FileUploadFom/FileUploadForm';
import { Main } from '@/components/New/Main';
import { BoxFieldset } from '@/components/UI/Fieldset';
import React from 'react';

export default async function AddFilesPage({ searchParams }) {
  const { parentId } = React.use(searchParams) as { parentId: string };

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
