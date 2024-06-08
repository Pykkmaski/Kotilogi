'use client';

import { updateEmail } from 'kotilogi-app/actions/user/updateEmail';

import { SingleInputForm } from '@/components/Feature/SingleInputForm/SingleInputForm';
import toast from 'react-hot-toast';
import { useUserProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/UserProvider';
import { FormControl, Input } from '@/components/UI/FormUtils';

export function EmailSettingsForm() {
  const {
    user: { email },
  } = useUserProviderContext();
  const submitMethod = async (newData: { email: string }) => {
    return updateEmail(email, newData.email);
  };

  return (
    <FormControl
      label='Sähköpostiosoite'
      control={
        <Input
          name='email'
          defaultValue={email}
          disabled
        />
      }
      helper='Sähköpostiosoitteita ei voi tällä hetkellä vaihtaa.'
    />
  );
}
