'use client';

import { useForm } from '@/hooks/useForm';
import { FormBase, FormButtons } from './FormBase';
import { ObjectDataType } from 'kotilogi-app/models/types';
import toast from 'react-hot-toast';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { AxiosResponse } from 'axios';

type ObjectDeletionFormProps<T extends { id: string }> = React.PropsWithChildren & {
  objectId: string;
  deleteMethod: (data: any) => Promise<AxiosResponse>;
  returnUrl: string;
};

export function ObjectDeletionForm<T extends { id: string }>({
  children,
  objectId,
  deleteMethod,
  returnUrl,
}: ObjectDeletionFormProps<T>) {
  const { data, updateData, status, setStatus, router } = useForm({ id: objectId });

  return (
    <FormBase
      onChange={updateData}
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);
        await deleteMethod(data as TODO)
          .then(res => {
            if (res.status == 200) {
              toast.success(res.statusText);
              router.push(returnUrl);
            } else {
              toast.error(res.statusText);
            }
          })
          .catch(err => toast.error(err.message))
          .finally(() => {
            setStatus(FormStatus.IDLE);
          });
      }}>
      {children}
      <FormButtons
        loading={status == FormStatus.LOADING}
        backAction={() => router.back()}
      />
    </FormBase>
  );
}
