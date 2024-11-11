'use client';

import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Button } from '@/components/New/Button';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { Check } from '@mui/icons-material';
import { updateUserAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';

export function EmailSettingsForm() {
  const { data, updateData } = useFormOnChangeObject({} as { email: string });
  const { method, status } = useStatusWithAsyncMethod(async () => {
    await updateUserAction(data);
  });

  const onSubmit = usePreventDefault(method);

  return (
    <form
      className='flex flex-col'
      onChange={updateData}
      onSubmit={onSubmit}>
      <FormControl
        label='Sähköpostiosoite'
        required
        control={
          <Input
            name='email'
            type='email'
            placeholder='Kirjoita uusi sähköpostiosoite....'
            value={data.email}
          />
        }
      />
      <div className='flex justify-start w-full'>
        <Button
          loading={status === 'loading'}
          type='submit'
          color='secondary'
          disabled={
            data.email == undefined ||
            data.email.length == 0 ||
            status === 'loading' ||
            status === 'done'
          }
          variant='contained'
          startIcon={<Check />}>
          Päivitä
        </Button>
      </div>
    </form>
  );
}
