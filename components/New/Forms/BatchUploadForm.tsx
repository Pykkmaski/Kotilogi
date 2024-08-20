'use client';

import { List } from '@/components/Feature/List';
import Spinner from '@/components/UI/Spinner';
import { useBatch } from '@/hooks/useBatch';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactElement, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

type BatchUploadFormProps<T> = {
  title: string;
  /**The element at the top which is used to collect data. */
  dataEntryComponent: ({ addEntry }) => ReactNode;

  /**The component used to render the confirmed entries. */
  entryComponent: ({
    entry,
    deleteEntry,
  }: {
    entry: T;
    deleteEntry: (entry: T) => void;
  }) => ReactNode;

  uploadMethod: (entries: T[]) => Promise<void>;
};

export function BatchUploadForm<T>({
  uploadMethod,
  dataEntryComponent: DataEntryComponent,
  entryComponent: EntryComponent,
  title,
}: BatchUploadFormProps<T>) {
  const { entries, addEntry, deleteEntry } = useBatch<T>();
  const [status, setStatus] = useState(FormStatus.IDLE);
  const router = useRouter();
  const loading = status == FormStatus.LOADING;

  return (
    <form
      className='w-full flex flex-col gap-4'
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);
        await uploadMethod(entries)
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
      <DataEntryComponent addEntry={addEntry} />
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
