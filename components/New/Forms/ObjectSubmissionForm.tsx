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
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ServerActionResponse } from '@/actions/lib/ServerActionResponse';

type ObjectSubmissionFormProps<T extends ObjectDataType> = React.PropsWithChildren & {
  parentId: string;

  onSubmit: (data: T, files: File[], router: AppRouterInstance) => Promise<ServerActionResponse>;
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

        try {
          const res = await onSubmit(data as TODO, files, router);
          if (res.status == 200) {
            toast.success(res.statusText);
            setStatus(FormStatus.DONE);
            router.back();
          } else {
            toast.error(res.statusText);
          }
        } catch (err) {
          toast.error(err.message);
        } finally {
          setStatus(prev => (prev === FormStatus.DONE ? prev : FormStatus.IDLE));
        }
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
