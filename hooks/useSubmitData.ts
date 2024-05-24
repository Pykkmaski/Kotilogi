import { useState } from 'react';
import { useInputData } from './useInputData';
import toast from 'react-hot-toast';
import { useInputFiles } from './useInputFiles';

type StatusType = 'idle' | 'loading' | string;

export function useSubmitData<DataT extends {}>(
  initialData: DataT,
  submitMethod: (data: DataT, files?: FormData[]) => Promise<void>
) {
  const [status, setStatus] = useState<StatusType>('idle');
  const { data, updateData, updateDataViaProperty } = useInputData(initialData);
  const { files, updateFiles } = useInputFiles();

  const submit = async (e: TODO) => {
    e.preventDefault();
    setStatus(() => 'loading');
    await submitMethod(data, files)
      .catch(err => toast.error(err.message))
      .finally(() => setStatus('idle'));
  };

  return {
    updateData,
    updateDataViaProperty,
    updateFiles,
    updateStatus: setStatus,
    submit,
    data,
    status,
  };
}
