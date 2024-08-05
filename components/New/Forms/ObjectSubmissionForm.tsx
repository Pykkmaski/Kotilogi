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

type ObjectSubmissionFormProps<T extends ObjectDataType> = React.PropsWithChildren & {
  parentId: string;
  createMethod: (data: T) => Promise<void>;
  updateMethod: (data: Required<Pick<T, 'id'>>) => Promise<void>;
  item?: T;
};

export function ObjectSubmissionForm<T extends ObjectDataType>({
  children,
  parentId,
  item,
  createMethod,
  updateMethod,
}: ObjectSubmissionFormProps<T>) {
  const { data, updateData, status, setStatus, router } = useForm(item || { parentId });
  const loading = status == FormStatus.LOADING;

  return (
    <FormBase
      onChange={updateData}
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);
        const method = !item ? createMethod : updateMethod;

        await method(data as TODO)
          .catch(err => toast.error(err.message))
          .finally(() => {
            setStatus(() => (method == updateMethod ? FormStatus.DONE : FormStatus.IDLE));
            router.back();
          });
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
