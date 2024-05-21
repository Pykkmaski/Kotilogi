import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Textarea } from '@/components/Feature/Input';
import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { addEvent } from 'kotilogi-app/actions/experimental/events';
import toast from 'react-hot-toast';

export function AddEventModalTrigger({ propertyId }) {
  return (
    <SubmitModalPrefab
      loadingText='Luodaan tapahtumaa...'
      successText='Tapahtuma luotu!'
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
        ).catch(err => toast.error(err.message));
      }}>
      <FormControl
        label='Otsikko'
        required
        control={
          <Input
            name='title'
            placeholder='Kirjoita otsikko...'
            autoComplete='off'
          />
        }
      />

      <FormControl
        label='Päiväys'
        required
        control={
          <Input
            name='time'
            required
            type='date'
          />
        }
      />

      <FormControl
        label='Kuvat ja tiedostot'
        helper='JPG tai PDF'
        control={
          <Input
            name='file'
            type='file'
            accept='application/pdf,image/jpeg'
            multiple
          />
        }
      />

      <FormControl
        label='Kuvaus'
        control={
          <Input
            variant='textarea'
            placeholder='Kirjoita kuvaus...'
            spellCheck={false}
            name='description'
          />
        }
      />
    </SubmitModalPrefab>
  );
}
