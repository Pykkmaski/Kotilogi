import { useState } from 'react';
import { useInputData } from './useInputData';
import toast from 'react-hot-toast';

type StatusType = 'idle' | 'loading' | string;

export function useSubmitData<DataT extends {}>(initialData: DataT, submitMethod: (data: DataT) => Promise<void>) {
  const [status, setStatus] = useState<StatusType>('idle');
  const { data, updateData } = useInputData(initialData);

  const submit = async (e: TODO) => {
    e.preventDefault();
    submitMethod(data);
  };

  return {
    updateData,
    updateStatus: setStatus,
    submit,
    data,
    status,
  };
}
