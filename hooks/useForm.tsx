import { useState } from 'react';
import { FormStatus } from './useDataSubmissionForm';
import { useInputData } from './useInputData';
import { useRouter } from 'next/navigation';

export function useForm<T extends {}>(initialData: T) {
  const { data, updateData, files } = useInputData(initialData);
  const [status, setStatus] = useState(FormStatus.IDLE);
  const router = useRouter();

  return { data, updateData, setStatus, status, router, files };
}
