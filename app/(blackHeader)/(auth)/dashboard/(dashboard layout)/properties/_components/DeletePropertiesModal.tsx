import { DeleteButton } from '@/components/Prefabs/List.prefabs';
import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { useSelectablesProviderContext } from '@/components/Util/SelectablesProvider';
import { deleteProperty } from 'kotilogi-app/actions/experimental/properties';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ErrorMessage, FormControl, Group } from '@/components/UI/FormUtils';
import { ErrorText } from '@/components/UI/Text';
import { Input } from '@/components/UI/FormUtils';

export function DeletePropertiesModalTrigger() {
  const { selectedItems: selectedProperties } = useSelectablesProviderContext();
  const [status, setStatus] = useState<'idle' | 'invalid_password'>('idle');

  return (
    <SubmitModalPrefab
      icon='fa-trash'
      trigger={<DeleteButton />}
      modalTitle='Poista valitut talot'
      submitText='Vahvista'
      submitMethod={async (data: { password: string }) => {
        const promises = selectedProperties.map(property =>
          deleteProperty(property.id, data.password)
        );

        const loadingToast = toast.loading('Poistetaan valittuja taloja...');
        await Promise.all(promises)
          .then(results => {
            toast.dismiss(loadingToast);

            const failure = results.find(result => result !== 'success');
            if (failure && failure === 'invalid_password') {
              setStatus(failure);
              throw new Error(failure);
            } else {
              toast.success('Talo(t) poistettu!');
            }
          })
          .catch(err => {
            const msg = err.message;
            if (msg.includes('invalid_password')) {
              toast.error('Antamasi salasana on väärä! Taloja ei poistettu.');
            } else {
              toast.error(err.message);
            }
          });
      }}>
      <FormControl
        label='Salasana'
        required
        control={
          <Input
            name='password'
            placeholder='Anna salasanasi...'
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
