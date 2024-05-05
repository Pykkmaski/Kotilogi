import { useInputData } from '@/hooks/useInputData';
import { FormEvent } from 'react';

export function Form({ children, onSubmit }) {
  const { data, updateData } = useInputData({});

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form
      onChange={updateData}
      onSubmit={submit}>
      {children}
    </form>
  );
}
