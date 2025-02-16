import { FileUploadForm } from '@/components/New/FileUploadFom/FileUploadForm';
import { BoxFieldset } from '@/components/UI/BoxFieldset';
import React from 'react';

export default async function AddFilesPage({ searchParams }) {
  const { parentId } = (await searchParams) as { parentId: string };

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
