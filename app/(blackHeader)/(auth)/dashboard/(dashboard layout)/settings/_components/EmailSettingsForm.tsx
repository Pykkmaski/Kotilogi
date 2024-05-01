'use client';

import { updateEmail } from 'kotilogi-app/actions/user/updateEmail';
import { Input } from '@/components/Feature/Input';
import { SingleInputForm } from '@/components/Feature/SingleInputForm/SingleInputForm';
import toast from 'react-hot-toast';
import { useUserProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/UserProvider';

export function EmailSettingsForm() {
  const {
    user: { email },
  } = useUserProviderContext();
  const submitMethod = async (newData: { email: string }) => {
    return updateEmail(email, newData.email);
  };

  return (
    <SingleInputForm
      submitMethod={submitMethod}
      editingDisabled={true}
      inputComponent={Input}
      initialInputProps={{
        name: 'email',
        label: 'Sähköpostiosoite',
        description: 'Tilisi sähköpostiosoite.',
        defaultValue: email,
        type: 'email',
      }}
    />
  );
}
