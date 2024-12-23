import { useBatchForm } from '@/hooks/useBatchForm';
import { FormControl, Input } from '../UI/FormUtils';
import { OptionSelector } from './OptionSelector';
import Button from '@mui/material/Button';
import { Add, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { LockDataType } from 'kotilogi-app/dataAccess/types';
import { BatchEntryType } from '@/hooks/useBatch';
import { useEffect } from 'react';

function Lock({ data, index = 0, onChange }) {
  return (
    <div className='flex flex-col gap-2'>
      <OptionSelector
        label='Lukon tyyppi'
        labelKey='label'
        valueKey='id'
        tablename='locking.types'
        name={`lockTypeId-${index}`}
        value={data.lockTypeId}
        onChange={onChange}
        key={`lock-type-${index}`}
      />

      <FormControl
        label='Brand'
        control={
          <Input
            name={`brand-${index}`}
            value={data.brand}
            placeholder='Anna lukon merkki'
            onChange={onChange}
          />
        }
      />

      <FormControl
        label='Malli'
        control={
          <Input
            name={`model-${index}`}
            value={data.model}
            placeholder='Anna lukon malli'
            onChange={onChange}
          />
        }
      />
      <FormControl
        label='Määrä'
        control={
          <Input
            type='number'
            name={`quantity-${index}`}
            value={data.quantity}
            placeholder='Anna lukojen määrä'
            onChange={onChange}
          />
        }
      />

      <FormControl
        label='Kuvaus'
        control={
          <textarea
            name={`description-${index}`}
            value={data.description}
            placeholder='Anna lukoille vaihtoehtoinen kuvaus...'
            onChange={onChange}
          />
        }
      />
    </div>
  );
}

type LockEditorProps = {
  lockData: LockDataType[];
  onChange: (entries: LockDataType[]) => void;
};

export function LockEditor({ lockData, onChange }: LockEditorProps) {
  const {
    entries: lockBatch,
    addEntry,
    removeEntry,
    updateEntry,
  } = useBatchForm<TODO>(lockData, 'kotidok-lock-data');

  const addLock = () => {
    addEntry({});
  };

  const updateLock = (e: any, batchId: number) => {
    const name = e.target.name.split('-').at(0);
    updateEntry(entry => entry.id == batchId, { [name]: e.target.value });
  };

  const removeLock = (batchId: number) => {
    removeEntry(batchId);
  };

  useEffect(() => {
    onChange(lockBatch.map(l => l.value));
  }, [lockBatch]);

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-semibold'>Lukot</h1>
      {lockBatch.map((l, index) => {
        return (
          <div
            className='w-full flex flex-col gap-2 p-2 border border-slate-100 rounded-md'
            key={`lock-${index}`}>
            <div className='flex justify-between w-full items-center'>
              <h1 className='font-semibold'>Lukko {index + 1}</h1>
              <IconButton
                size='small'
                onClick={() => removeLock(l.id)}>
                <Clear />
              </IconButton>
            </div>
            <Lock
              data={l.value}
              index={index}
              onChange={e => updateLock(e, l.id)}
            />
          </div>
        );
      })}
      <div className='flex justify-start w-full'>
        <Button
          color='secondary'
          startIcon={<Add />}
          onClick={addLock}
          variant='text'>
          Lisää lukko
        </Button>
      </div>
    </div>
  );
}
