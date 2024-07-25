'use client';

import { useForm } from '@/hooks/useForm';
import { FormBase, FormButtons } from './FormBase';
import { ObjectDataType } from 'kotilogi-app/models/types';
import toast from 'react-hot-toast';
import { FormStatus } from '@/hooks/useDataSubmissionForm';

type ObjectDeletionFormProps<T extends { id: string }> = React.PropsWithChildren & {
  objectId: string;
  deleteMethod: (data: any) => Promise<number>;
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
            if (res == 0) {
              router.push(returnUrl);
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
