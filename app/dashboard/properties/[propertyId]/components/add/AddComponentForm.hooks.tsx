import { useInputData } from '@/hooks/useInputData';
import { useRef } from 'react';

export function useAddComponentForm() {
  const { data, updateData, resetData } = useInputData({} as TODO);
  const formRef = useRef<HTMLFormElement | null>(null);

  return {
    updateData,
    data,
    formRef,
  };
}
