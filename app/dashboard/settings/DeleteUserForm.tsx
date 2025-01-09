'use client';

import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Button } from '@/components/New/Button';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { Check, Delete } from '@mui/icons-material';
import { deleteUserAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import toast from 'react-hot-toast';

export function DeleteUserForm() {
  const { data, updateData } = useFormOnChangeObject({} as { password: string });
  const { method, status } = useStatusWithAsyncMethod(
    async () => await deleteUserAction(data.password),
    err => toast.error(err.message)
  );
  const onSubmit = usePreventDefault(method);

  return (
    <form
      className='flex flex-col gap-4'
      onChange={updateData}
      onSubmit={onSubmit}>
      <h1 className='text-xl'>Poista käyttäjä</h1>
      <FormControl
        label='Salasana'
        required
        control={
          <Input
            name='password'
            type='password'
            autoComplete='new-password'
            placeholder='Kirjoita salasanasi....'
            value={data.password}
          />
        }
      />
      <div className='flex justify-start w-full'>
        <Button
          loading={status === 'loading'}
          type='submit'
          color='warning'
          disabled={
            data.password == undefined ||
            data.password.length == 0 ||
            status === 'loading' ||
            status === 'done'
          }
          variant='text'
          startIcon={<Delete />}>
          Poista Käyttäjä
        </Button>
      </div>
    </form>
  );
}
