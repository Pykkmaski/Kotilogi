'use client';

import { useInputData } from '@/hooks/useInputData';
import { FormBase } from './FormBase';

type DataSubmissionFormProps<T> = React.PropsWithChildren & {
  initialData?: T;
};

export function DataSubmissionForm<T>({ children, initialData }: DataSubmissionFormProps<T>) {
  const { data, updateData } = useInputData(initialData || ({} as T));

  return <FormBase onChange={updateData}>{children}</FormBase>;
}
