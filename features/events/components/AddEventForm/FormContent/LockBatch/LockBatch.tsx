import { FormControl, Input, NullOption } from '@/components/UI/FormUtils';
import { LockTypeSelector } from './LockTypeSelector';
import { useEventFormContext } from '../../EventFormContext';
import { LockEditor } from '@/components/Feature/LockEditor';
import { LockDataType } from 'kotilogi-app/dataAccess/types';
import IconButton from '@mui/material/IconButton';
import { OptionSelector, RadioSelector } from '@/components/Feature/OptionSelector';
import { Add, Clear } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Notification } from '@/components/UI/Notification';

export const LockBatch = () => {
  const { locks, addLockEntry, updateLockEntry, removeLockEntry } = useEventFormContext();
  const addLock = () => {
    addLockEntry({} as LockDataType);
  };

  const updateLock = (e: any, batchId: number) => {
    const name = e.target.name.split('-').at(0);
    updateLockEntry(entry => entry.id == batchId, {
      [name]: e.target.value,
    } as LockDataType);
  };

  const removeLock = (batchId: number) => {
    removeLockEntry(batchId);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-semibold'>Lukot</h1>
      {locks.length ? (
        locks.map((l, index) => {
          return (
            <div
              className='w-full flex flex-col gap-2 p-2 border border-slate-200 rounded-md'
              key={`lock-${index}`}>
              <div className='flex justify-between w-full items-center'>
                <h1 className='font-semibold'>Lukko {index + 1}</h1>
                <IconButton
                  size='small'
                  onClick={() => removeLock(l.id)}>
                  <Clear />
                </IconButton>
              </div>

              <RadioSelector
                label='Lukon tyyppi'
                labelKey='label'
                valueKey='label'
                tablename='types.lock_type'
                name={`lock_type-${index}`}
                value={l.value.lock_type}
                onChange={e => updateLock(e, l.id)}
                key={`lock-type-${l.id}`}
              />

              <FormControl
                label='Merkki'
                control={
                  <Input
                    name={`brand-${index}`}
                    value={l.value.brand}
                    placeholder='Anna lukon merkki'
                    onChange={e => updateLock(e, l.id)}
                    key={`lock-brand-input-${index}`}
                  />
                }
              />

              <FormControl
                label='Malli'
                control={
                  <Input
                    name={`model-${index}`}
                    value={l.value.model}
                    placeholder='Anna lukon malli'
                    onChange={e => updateLock(e, l.id)}
                    key={`lock-model-input-${index}`}
                  />
                }
              />

              <FormControl
                label='Määrä'
                control={
                  <Input
                    type='number'
                    name={`quantity-${index}`}
                    value={l.value.quantity}
                    placeholder='Anna lukojen määrä'
                    onChange={e => updateLock(e, l.id)}
                    key={`lock-quantity-input-${index}`}
                  />
                }
              />

              <FormControl
                label='Kuvaus'
                control={
                  <textarea
                    name={`description-${index}`}
                    value={l.value.description}
                    placeholder='Anna lukoille vaihtoehtoinen kuvaus...'
                    onChange={e => updateLock(e, l.id)}
                    key={`lock-description-input-${index}`}
                  />
                }
              />
            </div>
          );
        })
      ) : (
        <Notification position='start'>Ei lisättyjä lukkoja</Notification>
      )}
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
};
