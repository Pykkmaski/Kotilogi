'use client';

import { Button } from '@/components/New/Button';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { Check } from '@mui/icons-material';
import { updateEmailAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ErrorText, SuccessText } from '@/components/UI/Text';

export function EmailSettingsForm() {
  const { data, updateData } = useFormOnChangeObject({} as { email: string });
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const { method, status } = useStatusWithAsyncMethod(
    async () => {
      setErrorMsg(null);
      await updateEmailAction(data.email).then(res => {
        if (res.status !== 200) {
          setErrorMsg(res.statusText);
          throw new Error(res.statusText);
        } else {
          toast.success('Sähköpostin vaihtolinkki lähetetty!');
        }
      });
    },
    err => toast.error(err.message)
  );

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
        helper={
          errorMsg ? (
            <ErrorText>{errorMsg}</ErrorText>
          ) : status === 'done' ? (
            <SuccessText>Sähköpostiosoitteen vaihtolinkki lähetetty!</SuccessText>
          ) : null
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
          variant='text'
          startIcon={<Check />}>
          Päivitä
        </Button>
      </div>
    </form>
  );
}
