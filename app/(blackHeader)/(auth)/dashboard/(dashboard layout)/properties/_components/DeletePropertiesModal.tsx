import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { useSelectablesProviderContext } from '@/components/Util/SelectablesProvider';
import { deleteProperty } from 'kotilogi-app/actions/experimental/properties';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ErrorMessage, FormControl, Group } from '@/components/UI/FormUtils';
import { ErrorText } from '@/components/UI/Text';
import { Input } from '@/components/UI/FormUtils';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DeleteButton } from '@/components/Feature/GalleryBase/Buttons';

export function DeletePropertiesModalTrigger() {
  const { selectedItems: selectedProperties, resetSelected } = useSelectablesProviderContext();
  const [status, setStatus] = useState<'idle' | 'invalid_password'>('idle');

  return (
    <SubmitModalPrefab
      icon='fa-trash'
      trigger={<DeleteButton />}
      modalTitle='Poista valitut kohteet'
      loadingText='Poistetaan kohteita...'
      successText='Kohteet poistettu!'
      submitText='Vahvista'
      onClose={() => {
        setStatus('idle');
      }}
      submitMethod={async (data: { password: string }) => {
        setStatus('idle');
        const promises = selectedProperties.map(property =>
          deleteProperty(property.id, data.password)
        );

        await Promise.all(promises)
          .then(results => {
            const failure = results.find(result => result !== 'success');
            if (failure && failure === 'invalid_password') {
              setStatus(failure);
              throw new Error(failure);
            }

            resetSelected();
          })
          .catch(err => {
            const msg = err.message;
            if (msg.includes('invalid_password')) {
              toast.error('Antamasi salasana on väärä! Taloja ei poistettu.');
            } else {
              toast.error(err.message);
            }
            throw err;
          });
      }}>
      <FormControl
        label='Salasana'
        required
        control={
          <Input
            name='password'
            placeholder='Anna salasanasi...'
            type='password'
            autoComplete='new-password'
          />
        }
        helper={
          status === 'invalid_password' ? (
            <ErrorMessage>Salasana on virheellinen!</ErrorMessage>
          ) : null
        }
      />
    </SubmitModalPrefab>
  );
}
