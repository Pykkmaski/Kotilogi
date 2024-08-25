'use client';

import { AUploadFile } from '@/actions/files';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useForm } from '@/hooks/useForm';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormButtons } from './Forms/FormBase';
import { ProgressBar } from './ProgressBar';
import axios from 'axios';

type FileUploadFormProps = {
  fileParentId: string;
  onComplete?: () => void;
};

export function FileUploadForm({ fileParentId, onComplete }: FileUploadFormProps) {
  const { updateData, status, setStatus, files, router } = useForm({});
  const [filesUploaded, setFilesUploaded] = useState(0);

  const upload = async e => {
    e.preventDefault();
    setStatus(FormStatus.LOADING);

    for (const file of files) {
      const fdata = new FormData();
      fdata.append('parentId', fileParentId);
      fdata.append('file', file);
      await axios.post('/api/protected/files', fdata).then(res => {
        if (res.status == 200) {
          setFilesUploaded(prev => prev + 1);
        } else {
          toast.error(`Tiedoston ${file.name} lataus epäonnistui!`);
        }
      });
    }

    setStatus(-1);
    setTimeout(() => router.back(), 1000);
  };

  const loading = status == FormStatus.LOADING;
  const totalFiles = files.length;

  return (
    <form
      className='flex w-full flex-col gap-4'
      onChange={updateData}
      onSubmit={upload}>
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
        loading={loading || status == -1}
        backAction={() => router.back()}
      />
    </form>
  );
}
