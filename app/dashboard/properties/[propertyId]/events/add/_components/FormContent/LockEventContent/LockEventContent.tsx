import { FormControl, Input, NullOption } from '@/components/UI/FormUtils';
import { LockTypeSelector } from './LockTypeSelector';

export const LockEventContent = () => (
  <>
    <LockTypeSelector />
    <FormControl
      label='Merkki'
      control={
        <Input
          name='brand'
          type='text'
          placeholder='Kirjoita lukon merkki...'
        />
      }
    />
    <FormControl
      label='Malli'
      control={
        <Input
          name='model'
          type='text'
          placeholder='Kirjoita lukon malli...'
        />
      }
    />

    <FormControl
      label='Määrä'
      control={
        <Input
          name='quantity'
          type='number'
          placeholder='Kirjoita lukkojen määrä...'
        />
      }
    />
  </>
);
