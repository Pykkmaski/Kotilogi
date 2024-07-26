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
};

export function FileUploadForm({ fileParentId }: FileUploadFormProps) {
  const { updateData, status, setStatus, files, router } = useForm({});
  const [uploadedFileSize, setUploadedFileSize] = useState(0);
  const [totalSizeOfFiles, setTotalSizeOfFiles] = useState(0);

  const upload = async e => {
    e.preventDefault();
    setStatus(FormStatus.LOADING);
    const failedUploads: string[] = [];

    const promises = files.map(file => {
      const fd = new FormData();
      fd.set('file', file);

      AUploadFile(fd, fileParentId)
        .then(() => {
          setUploadedFileSize(prev => prev + file.size);
        })
        .catch(err => {
          failedUploads.push(file.name);
        });
    });

    await Promise.allSettled(promises).then(() => {
      failedUploads.forEach(item => toast.error('Tiedoston ' + item + ' lataus epäonnistui!'));
      setStatus(FormStatus.IDLE);
    });
  };

  const loading = status == FormStatus.LOADING;

  useEffect(() => {
    console.log(files);
    setTotalSizeOfFiles(files.reduce((acc, cur) => (acc += cur.size), 0));
  }, [files.length]);

  return (
    <form
      className='flex w-full flex-col'
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
        multiple
      />
      <FormButtons
        loading={loading}
        backAction={() => router.back()}
      />
    </form>
  );
}
