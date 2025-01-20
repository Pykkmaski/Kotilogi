'use client';

import { Button } from '@/components/New/Button';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { ErrorText, SuccessText } from '@/components/UI/Text';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { Check } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { updatePasswordAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';

export function PasswordSettingsForm() {
  const { data, updateData } = useFormOnChangeObject(
    {} as { password1: string; password2: string }
  );
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');

  const passwordsMatch = useMemo(() => {
    return data.password1 === data.password2;
  }, [data.password1, data.password2]);

  const submitDisabled = useMemo(() => {
    return !data.password1 || !data.password2 || !passwordsMatch || status === 'success';
  }, [data.password1, data.password2, passwordsMatch, status]);

  const { method } = useStatusWithAsyncMethod(async () => {
    setStatus('loading');
    await updatePasswordAction({ password: data.password1 })
      .then(() => setStatus('success'))
      .catch(err => setStatus('error'))
      .finally(() => setStatus(prev => (prev === 'loading' ? 'idle' : prev)));
  });
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
            autoComplete='new-password'
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
            autoComplete='off'
            minLength={8}
            placeholder='Kirjoita salasana uudelleen....'
            value={data.password2}
          />
        }
        helper={
          !passwordsMatch ? (
            <ErrorText>Salasanat eivät täsmää!</ErrorText>
          ) : status === 'error' ? (
            <ErrorText>Tapahtui odottamaton virhe!</ErrorText>
          ) : status === 'success' ? (
            <SuccessText>Salasanan vaihto onnistui!</SuccessText>
          ) : null
        }
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
