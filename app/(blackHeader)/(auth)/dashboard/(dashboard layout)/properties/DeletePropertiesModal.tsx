import { Input } from '@/components/Input/Input';
import { DeleteButton } from '@/components/Prefabs/List.prefabs';
import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import { useSelectablesProviderContext } from '@/components/Util/SelectablesProvider';
import { deleteProperty } from 'kotilogi-app/actions/experimental/properties';
import toast from 'react-hot-toast';

export function DeletePropertiesModalTrigger() {
  const { selectedItems: selectedProperties } = useSelectablesProviderContext();

  return (
    <SubmitModalPrefab
      trigger={<DeleteButton />}
      modalTitle='Poista valitut talot'
      submitMethod={async (data: { password: string }) => {
        const promises = selectedProperties.map(property =>
          deleteProperty(property.id, data.password)
        );
        await Promise.all(promises)
          .then(() => toast.success('Talo(t) poistettu!'))
          .catch(err => {
            toast.error(err.message);
          });
      }}>
      <Input
        name='password'
        type='password'
        label='Salasana'
        description='Nykyinen salasanasi.'
        placeholder='Kirjoita salasanasi...'
        autoComplete='new-password'
        required
      />
    </SubmitModalPrefab>
  );
}
