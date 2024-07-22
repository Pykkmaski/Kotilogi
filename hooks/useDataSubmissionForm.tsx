import toast from 'react-hot-toast';
import { useInputData } from './useInputData';
import { useState } from 'react';
import { ObjectDataType } from 'kotilogi-app/models/types';
export enum FormStatus {
  IDLE = 0,
  LOADING,
  ERROR = -1,
}

export function useDataSubmissionForm<T extends Partial<ObjectDataType>>(
  updateAction: (data: TODO) => Promise<number>,
  createAction: (data: TODO) => Promise<number>,
  initialData?: T
) {
  const { data, updateData } = useInputData(initialData || ({} as T));
  const [status, setStatus] = useState(FormStatus.IDLE);

  const onSubmit = async (e: TODO) => {
    try {
      e.preventDefault();
      setStatus(FormStatus.LOADING);
      const action = initialData && initialData.id ? updateAction : createAction;

      await action(data).then(() => setStatus(FormStatus.IDLE));
    } catch (err) {
      setStatus(FormStatus.ERROR);
      toast.error(err.message);
    }
  };

  return {
    data,
    status,
    updateData,
    onSubmit,
    setStatus,
  };
}
