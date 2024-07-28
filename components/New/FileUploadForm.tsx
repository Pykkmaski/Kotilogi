'use client';

import { AUploadFile } from '@/actions/files';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useForm } from '@/hooks/useForm';
import { useInputData } from '@/hooks/useInputData';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormButtons } from './Forms/FormBase';
import { ProgressBar } from './ProgressBar';
import { Button } from '@mui/material';

type FileUploadFormProps = {
  fileParentId: string;
  onComplete?: () => void;
};

export function FileUploadForm({ fileParentId, onComplete }: FileUploadFormProps) {
  const { updateData, status, setStatus, files, router } = useForm({});
  const [uploadedFileSize, setUploadedFileSize] = useState(0);
  const [totalSizeOfFiles, setTotalSizeOfFiles] = useState(0);

  const upload = async e => {
    e.preventDefault();
    setStatus(FormStatus.LOADING);

    for (const file of files) {
      const fd = new FormData();
      fd.set('file', file);

      try {
        await AUploadFile(fd, fileParentId);
        setUploadedFileSize(prev => {
          const newSize = prev + file.size;

          return newSize;
        });
      } catch (err: any) {
        toast.error('Tiedoston ' + file.name + ' lataus epäonnistui!');
      }
    }

    setStatus(-1);
    setTimeout(() => router.back(), 1000);
  };

  const loading = status == FormStatus.LOADING;

  useEffect(() => {
    setTotalSizeOfFiles(files.reduce((acc, cur) => (acc += cur.size), 0));
  }, [files.length]);

  return (
    <form
      className='flex w-full flex-col gap-4'
      onChange={updateData}
      onSubmit={upload}>
      <ProgressBar
        className='w-full h-4'
        maxProgress={totalSizeOfFiles}
        currentProgress={uploadedFileSize}
      />
      <input
        type='file'
        name='file'
        accept='image/jpeg,application/pdf'
        multiple
      />

      <FormButtons
        loading={loading || status == -1}
        backAction={() => router.back()}
      />
    </form>
  );
}
