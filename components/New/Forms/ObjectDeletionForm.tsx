'use client';

import { useForm } from '@/hooks/useForm';
import { FormBase, FormButtons } from './FormBase';
import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import toast from 'react-hot-toast';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { AxiosResponse } from 'axios';
import { ServerActionResponse } from '@/actions/lib/ServerActionResponse';

type ObjectDeletionFormProps<T extends { id: string }> = React.PropsWithChildren & {
  objectId: string;
  deleteMethod: (data: any) => Promise<void>;
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
        try {
          await deleteMethod(data as TODO);
          toast.success('Poisto onnistui!');
          setStatus(FormStatus.DONE);
          router.push(returnUrl);
        } catch (err) {
          toast.error(err.message);
        } finally {
          setStatus(prev => {
            if (prev === FormStatus.DONE) {
              return prev;
            } else {
              return FormStatus.IDLE;
            }
          });
        }
      }}>
      {children}
      <FormButtons
        done={status == FormStatus.DONE}
        loading={status == FormStatus.LOADING}
        backAction={() => router.back()}
      />
    </FormBase>
  );
}
