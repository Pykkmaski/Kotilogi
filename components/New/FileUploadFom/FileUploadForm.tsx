'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormButtons } from '../Forms/FormBase';
import { ProgressBar } from '../ProgressBar';
import { createFileAction } from 'kotilogi-app/app/dashboard/files/actions';
import { useFormOnChangeFiles } from '@/hooks/useFormOnChangeFiles';
import { FileList } from '../FileList';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { useRouter } from 'next/navigation';
import { usePreventDefault } from '@/hooks/usePreventDefault';

type FileUploadFormProps = {
  fileParentId: string;
  onComplete?: () => void;
};

export function FileUploadForm({ fileParentId, onComplete }: FileUploadFormProps) {
  const router = useRouter();
  const { files, updateFiles, removeFile } = useFormOnChangeFiles();
  const { method, status } = useStatusWithAsyncMethod(async () => {
    for (const file of files) {
      const fdata = new FormData();
      fdata.append('parent_id', fileParentId);
      fdata.append('file', file);
      await createFileAction(fdata)
        .then(res => {
          if (res.status == 200) {
            setFilesUploaded(prev => prev + 1);
          } else if (res.status == 409) {
            toast.error('Et voi ladata enempää tiedostoja! Suurin sallittu raja kohteelle on 10.');
          } else {
            toast.error(`Tiedoston ${file.name} lataus epäonnistui!`);
          }
        })
        .catch(err => {
          toast.error(err.message);
        });
    }

    setTimeout(() => router.back(), 1000);
  });
  const onSubmit = usePreventDefault(method);
  const [filesUploaded, setFilesUploaded] = useState(0);
  const totalFiles = files.length;

  return (
    <form
      className='flex w-full flex-col gap-4'
      onChange={(e: any) => updateFiles(e)}
      onSubmit={onSubmit}>
      <ProgressBar
        className='w-full h-4'
        maxProgress={totalFiles}
        currentProgress={filesUploaded}
      />
      <input
        type='file'
        name='file'
        accept='image/jpeg,application/pdf'
        multiple
      />

      <FormButtons
        submitDisabled={files.length == 0}
        loading={status === 'loading' || status === 'done'}
        backAction={() => router.back()}
      />

      <FileList
        files={files}
        onDelete={file => removeFile(file.name)}
      />
    </form>
  );
}
