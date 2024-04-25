import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Input, Textarea } from '@/components/Feature/Input';
import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { addEvent } from 'kotilogi-app/actions/experimental/events';
import toast from 'react-hot-toast';

export function AddEventModalTrigger({ propertyId }) {
  return (
    <SubmitModalPrefab
      trigger={<AddButton />}
      icon='fa-history'
      modalTitle='Lisää Tapahtuma'
      submitText='Lähetä'
      submitMethod={async (data: Kotidok.EventType, files?) => {
        await addEvent(
          {
            ...data,
            refId: propertyId,
          },
          files
        )
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

      <Input
        label='Kuvat ja tiedostot'
        description='PDF/JPG'
        name='file'
        type='file'
        accept='application/pdf,image/jpeg'
        multiple
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
