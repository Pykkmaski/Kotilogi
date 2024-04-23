import { Input, Textarea } from '@/components/Input/Input';
import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { addEvent } from 'kotilogi-app/actions/experimental/events';
import toast from 'react-hot-toast';

export function AddEventModalPrefab({ propertyId }) {
  return (
    <SubmitModalPrefab
      trigger={<AddButton />}
      modalTitle='Lisää Tapahtuma'
      submitText='Lähetä'
      submitMethod={async (data: Kotidok.EventType) => {
        await addEvent({
          ...data,
          refId: propertyId,
        })
          .then(() => toast.success('Tapahtuma lisätty!'))
          .catch(err => toast.error(err.message));
      }}>
      <Input
        name='title'
        label='Otsikko'
        description='Tapahtuman otsikko.'
        placeholder='Kirjoita otsikko...'
        required={true}
        autoComplete='off'
      />

      <Input
        name='time'
        label='Päiväys'
        description='Tapahtuman päivämäärä.'
        required
        type='date'
      />

      <Textarea
        label='Kuvaus'
        description='Tapahtuman lyhyt kuvaus.'
        placeholder='Kirjoita kuvaus...'
        spellCheck={false}
        name='description'
      />
    </SubmitModalPrefab>
  );
}
