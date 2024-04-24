import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { add as addUsage } from '@/actions/usage';
import toast from 'react-hot-toast';
import { Input, Select } from '@/components/Input/Input';
import { useUsageProviderContext } from './UsageProvider';

export function AddUsageModalTrigger() {
  const { propertyId, type } = useUsageProviderContext();

  return (
    <SubmitModalPrefab
      trigger={<AddButton />}
      modalTitle='Lisää kulutustieto'
      submitMethod={async (data: Kotidok.UsageType, files?) => {
        await addUsage({
          ...data,
          type: type !== 'all' ? type : data.type,
          refId: propertyId,
        })
          .then(() => toast.success('Tieto lisätty!'))
          .catch(err => toast.error(err.message));
      }}>
      {type === 'all' ? (
        <Select
          label='Tyyppi'
          description='Kulutustiedon tyyppi.'
          name='type'
          required={true}>
          <option
            value='heat'
            selected={true}>
            Lämmityskulu
          </option>
          <option value='water'>Vesikulu</option>
          <option value='electric'>Sähkökulu</option>
        </Select>
      ) : null}

      <Input
        name='unitAmount'
        label='Määrä'
        description='Määrä yksiköissä, esim kwh.'
        placeholder='Kirjoita laskun yksikkömäärä...'
        type='number'
        step={0.01}
        min={0.01}
        required
      />

      <Input
        min={0.01}
        step={0.01}
        name='price'
        label='Laskun Hinta'
        description='Laskun hinta euroissa.'
        placeholder='Kirjoita laskun hinta...'
        type='number'
        required
      />

      <Input
        name='time'
        label='Laskun päiväys'
        description='Laskun päivämäärä.'
        placeholder='Kirjoita laskun päivämäärä...'
        type='date'
        required
      />
    </SubmitModalPrefab>
  );
}
