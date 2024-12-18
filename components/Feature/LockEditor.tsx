import { useBatchForm } from '@/hooks/useBatchForm';
import { FormControl, Input } from '../UI/FormUtils';
import { OptionSelector } from './OptionSelector';
import Button from '@mui/material/Button';
import { Add, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export function LockEditor({ lockData = null, onChange = null }) {
  const { entries: lockBatch, addEntry, removeEntry, updateEntry } = useBatchForm<TODO>();
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

  return (
    <div className='flex flex-col gap-4'>
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

            <OptionSelector
              label='Lukon tyyppi'
              labelKey='label'
              valueKey='id'
              tablename='locking.types'
              name={`lockTypeId-${index}`}
              value={l.value.lockTypeId}
              onChange={e => updateLock(e, l.id)}
              key={`lock-type-${l.id}`}
            />

            <FormControl
              label='Brand'
              control={
                <Input
                  name={`brand-${index}`}
                  value={l.value.brand}
                  placeholder='Anna lukon merkki'
                  onChange={e => updateLock(e, l.id)}
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
                />
              }
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
