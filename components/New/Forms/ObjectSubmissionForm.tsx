'use client';

import { useInputData } from '@/hooks/useInputData';
import { FormBase, FormButtons } from './FormBase';
import { useState } from 'react';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Check } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { ObjectDataType } from 'kotilogi-app/models/types';
import { useForm } from '@/hooks/useForm';
import { AxiosResponse } from 'axios';

type ObjectSubmissionFormProps<T extends ObjectDataType> = React.PropsWithChildren & {
  parentId: string;

  onSubmit: (data: T, files: File[]) => Promise<AxiosResponse>;
  item?: T;
};

export function ObjectSubmissionForm<T extends ObjectDataType>({
  children,
  parentId,
  item,
  onSubmit,
}: ObjectSubmissionFormProps<T>) {
  const { files, data, updateData, status, setStatus, router } = useForm(item || { parentId });
  const loading = status == FormStatus.LOADING;

  return (
    <FormBase
      onChange={updateData}
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);

        await onSubmit(data as TODO, files)
          .then(res => {
            setStatus(() => FormStatus.DONE);
            if (res.status == 200) {
              toast.success(res.statusText);
              router.back();
            } else {
              toast.error(res.statusText);
            }
          })
          .catch(err => toast.error(err.message))
          .finally(() => setStatus(FormStatus.IDLE));
      }}>
      {children}
      <FormButtons
        done={status == FormStatus.DONE}
        loading={loading}
        backAction={() => router.back()}
      />
    </FormBase>
  );
}
