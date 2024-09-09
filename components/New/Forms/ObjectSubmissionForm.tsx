'use client';

import { FormBase, FormButtons } from './FormBase';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { useForm } from '@/hooks/useForm';

type ObjectSubmissionFormProps<T extends ObjectDataType> = React.PropsWithChildren & {
  initialData: T;
  onSubmit: (data: T, files?: File[], router?: TODO) => Promise<void>;
};

export function ObjectSubmissionForm<T extends ObjectDataType>({
  children,
  initialData,
  onSubmit,
  ...props
}: ObjectSubmissionFormProps<T>) {
  const { data, files, status, updateData, setStatus } = useForm(initialData);
  const router = useRouter();
  const loading = FormStatus.LOADING === status;

  return (
    <FormBase
      onChange={updateData}
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);

        try {
          await onSubmit(data as TODO, files, router);
          setStatus(FormStatus.DONE);
          router.back();
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
