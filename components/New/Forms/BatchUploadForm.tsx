'use client';

import Spinner from '@/components/UI/Spinner';
import { useBatch } from '@/hooks/useBatch';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Add, Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ContentBox } from '../Boxes/ContentBox';

type BatchUploadFormProps<T> = React.PropsWithChildren & {
  title: string;
  /**The component used to render the confirmed entries. */
  entryComponent: ({
    entry,
    deleteEntry,
  }: {
    entry: T;
    deleteEntry: (entry: T) => void;
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
  const { entries, addEntry, deleteEntry } = useBatch<T>();
  const [status, setStatus] = useState(FormStatus.IDLE);
  const { data, updateData, resetData, files } = useInputData({} as T);
  const router = useRouter();
  const loading = status == FormStatus.LOADING;
  const addFormRef = useRef<HTMLFormElement | null>(null);

  const add = () => {
    addEntry(data);
    resetData({} as T);
    addFormRef.current?.reset();
  };

  const addDisabled = isAddingDisabled(data);
  return (
    <form
      className='w-full flex flex-col gap-4'
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);
        await onSubmit(entries)
          .then(() => {
            toast.success('Tiedot lisätty onnistuneesti!');
            router.back();
          })
          .catch(err => toast.error(err.message))
          .finally(() => setStatus(FormStatus.IDLE));
      }}>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-lg'>{title}</h1>
        <div className='flex gap-4'>
          <Button
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
          ref={addFormRef}
          className='flex flex-col gap-2'
          onChange={updateData}>
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
          deleteEntry={deleteEntry}
        />
      ))}
    </form>
  );
}
