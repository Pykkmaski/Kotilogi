'use client';

import { FormBase, FormButtons } from './FormBase';
import toast from 'react-hot-toast';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { useRouter } from 'next/navigation';
import { usePreventDefault } from '@/hooks/usePreventDefault';

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
  const router = useRouter();
  const { data, updateData } = useFormOnChangeObject({ id: objectId });
  const { method, status } = useStatusWithAsyncMethod(async () => {
    await deleteMethod(data as TODO);
    toast.success('Poisto onnistui!');
    router.push(returnUrl);
  });
  const onSubmit = usePreventDefault(method);

  return (
    <FormBase
      onChange={updateData}
      onSubmit={onSubmit}>
      {children}
      <FormButtons
        done={status === 'done'}
        loading={status === 'loading'}
        backAction={() => router.back()}
      />
    </FormBase>
  );
}
