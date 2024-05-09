import { Input } from '@/components/Feature/Input';
import { DeleteButton } from '@/components/Prefabs/List.prefabs';
import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { useSelectablesProviderContext } from '@/components/Util/SelectablesProvider';
import { deleteProperty } from 'kotilogi-app/actions/experimental/properties';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Group } from '@/components/UI/FormUtils';
import { ErrorText } from '@/components/UI/Text';

export function DeletePropertiesModalTrigger() {
  const { selectedItems: selectedProperties } = useSelectablesProviderContext();
  const [status, setStatus] = useState<'idle' | 'invalid_password'>('idle');

  return (
    <SubmitModalPrefab
      icon='fa-trash'
      trigger={<DeleteButton />}
      modalTitle='Poista valitut talot'
      submitMethod={async (data: { password: string }) => {
        const promises = selectedProperties.map(property =>
          deleteProperty(property.id, data.password)
        );

        await Promise.all(promises)
          .then(results => {
            const failure = results.find(result => result !== 'success');
            if (failure && failure === 'invalid_password') {
              setStatus(failure);
            } else {
              toast.success('Talo(t) poistettu!');
            }
          })
          .catch(err => {
            toast.error(err.message);
          });
      }}>
      <Group>
        <Input
          name='password'
          type='password'
          label='Salasana'
          description='Nykyinen salasanasi.'
          placeholder='Kirjoita salasanasi...'
          autoComplete='new-password'
          required
        />
        {status === 'invalid_password' ? <ErrorText>Salasana on virheellinen!</ErrorText> : null}
      </Group>
    </SubmitModalPrefab>
  );
}
