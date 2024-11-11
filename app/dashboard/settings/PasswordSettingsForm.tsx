'use client';

import { Button } from '@/components/New/Button';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { ErrorText, SuccessText } from '@/components/UI/Text';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { Check } from '@mui/icons-material';
import { useMemo } from 'react';
import { updatePasswordAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';

export function PasswordSettingsForm() {
  const { data, updateData } = useFormOnChangeObject(
    {} as { password1: string; password2: string }
  );

  const passwordsMatch = useMemo(() => {
    return data.password1 === data.password2;
  }, [data.password1, data.password2]);

  const submitDisabled = useMemo(() => {
    return !data.password1 || !data.password2 || !passwordsMatch;
  }, [data.password1, data.password2, passwordsMatch]);

  const { method, status } = useStatusWithAsyncMethod(
    async () => await updatePasswordAction({ password: data.password1 })
  );
  const onSubmit = usePreventDefault(method);

  return (
    <form
      className='flex flex-col'
      onChange={updateData}
      onSubmit={onSubmit}>
      <FormControl
        label='Salasana'
        required
        control={
          <Input
            name='password1'
            type='password'
            minLength={8}
            autoComplete='off'
            placeholder='Kirjoita uusi salasana....'
            value={data.password1}
          />
        }
      />

      <FormControl
        label='Toista salasana'
        required
        control={
          <Input
            name='password2'
            type='password'
            autoComplete='none'
            minLength={8}
            placeholder='Kirjoita salasana uudelleen....'
            value={data.password2}
          />
        }
        helper={!passwordsMatch && <ErrorText>Salasanat eivät täsmää!</ErrorText>}
      />

      <div className='flex justify-start w-full'>
        <Button
          loading={status === 'loading'}
          type='submit'
          color='secondary'
          disabled={submitDisabled}
          variant='text'
          startIcon={<Check />}>
          Päivitä
        </Button>
      </div>
    </form>
  );
}
