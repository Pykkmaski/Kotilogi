import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { add as addUsage } from '@/actions/usage';
import toast from 'react-hot-toast';
import { Input, Select } from '@/components/Input/Input';
import { useUsageProviderContext } from './UsageProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function AddUsageModalTrigger() {
  const { propertyId, type } = useUsageProviderContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <SubmitModalPrefab
      trigger={<AddButton />}
      modalTitle='Lisää kulutustieto'
      submitMethod={async (data: Kotidok.UsageType, files?) => {
        /**Make sure the submit data modal correctly sets default values for select elements! Otherwise this doesn't work */
        await addUsage({
          ...data,
          type: data.type || (type !== 'all' ? type : 'heat'),
          refId: propertyId,
        })
          .then(() => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('year', data.time.split('-')[0]);
            router.push(`${pathname}?${newSearchParams.toString()}`);
            toast.success('Tieto lisätty!');
          })
          .catch(err => {
            console.log(err.message);
            toast.error(err.message);
          });
      }}>
      {type === 'all' ? (
        <Select
          label='Tyyppi'
          description='Kulutustiedon tyyppi.'
          name='type'
          defaultValue={'heat'}
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
