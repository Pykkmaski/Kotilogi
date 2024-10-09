'use client';

import Spinner from '@/components/UI/Spinner';
import { useBatch } from '@/hooks/useBatch';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Add, Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, useId, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ContentBox } from '../Boxes/ContentBox';
import { AxiosResponse } from 'axios';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { ServerActionResponse } from '@/actions/lib/ServerActionResponse';

type BatchUploadFormProps<T> = React.PropsWithChildren & {
  title: string;
  /**The component used to render the confirmed entries. */
  entryComponent: ({
    entry,
    deleteEntry,
  }: {
    entry: T;
    deleteEntry: (item: T) => void;
  }) => ReactNode;

  onSubmit: (entries: T[]) => Promise<void>;
  isAddingDisabled: (data: T) => boolean;
};

export function BatchUploadForm<T>({
  children,
  onSubmit,
  entryComponent: EntryComponent,
  title,
  isAddingDisabled,
}: BatchUploadFormProps<T>) {
  const { entries, addEntry, removeEntry } = useBatch<T>();
  const [status, setStatus] = useState(FormStatus.IDLE);
  const { data, updateData, resetData, files } = useInputData({} as T);
  const router = useRouter();
  const loading = status == FormStatus.LOADING;
  const addFormRef = useRef<HTMLFormElement | null>(null);
  const formId = useId();

  const add = () => {
    addEntry(data);
    resetData({} as T);
    addFormRef.current?.reset();
  };

  const submit = async e => {
    setStatus(FormStatus.LOADING);

    try {
      await onSubmit(entries);
      router.back();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus(FormStatus.IDLE);
    }
  };

  const addDisabled = isAddingDisabled(data);
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-lg'>{title}</h1>
        <div className='flex gap-4'>
          <Button
            onClick={submit}
            startIcon={!loading ? <Check /> : <Spinner size='1rem' />}
            variant='contained'
            type='submit'
            disabled={!entries.length || loading}>
            Vahvista
          </Button>
        </div>
      </div>
      <ContentBox>
        <form
          id={formId}
          className='flex flex-col gap-2'
          onChange={(e: any) => {
            console.log(e.target.checked, e.target.value, e.target.name);
            updateData(e);
          }}
          ref={addFormRef}>
          {children}

          <div className='flex justify-start'>
            <Button
              disabled={addDisabled}
              type='button'
              onClick={add}
              variant='contained'
              startIcon={<Add />}>
              Lisää
            </Button>
          </div>
        </form>
      </ContentBox>

      {entries.map((entry, i) => (
        <EntryComponent
          key={`entry-comp-${i}`}
          entry={entry}
          deleteEntry={item => removeEntry(i => i == item)}
        />
      ))}
    </div>
  );
}
