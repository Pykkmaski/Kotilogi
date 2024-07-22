import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { add as addUsage } from '@/actions/usage';
import toast from 'react-hot-toast';

import { useUsageProviderContext } from './UsageProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { FormControl, Group, Input, Label } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Divider, MenuItem, Select } from '@mui/material';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { ACreateUtilityData } from '@/actions/utilityData';
import { UtilityDataType } from 'kotilogi-app/models/types';

export function AddUsageModalTrigger() {
  const { propertyId, type } = useUsageProviderContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getUnits = () => {
    if (type != UtilityType.ALL) {
      return `(${
        type == UtilityType.HEAT
          ? 'mw/h'
          : type == UtilityType.WATER
          ? 'L'
          : type == UtilityType.ELECTRIC
          ? 'kw/h'
          : null
      })`;
    } else {
      return '';
    }
  };

  return (
    <SubmitModalPrefab
      icon={
        type == UtilityType.HEAT ? 'fa-fire' : type == UtilityType.WATER ? 'fa-tint' : 'fa-bolt'
      }
      trigger={<AddButton />}
      loadingText='Luodaan kulutustietoa...'
      modalTitle={
        type == UtilityType.HEAT
          ? 'Lisää lämmityskulu'
          : type == UtilityType.WATER
          ? 'Lisää vesikulu'
          : type == UtilityType.ELECTRIC
          ? 'Lisää sähkökulu'
          : 'Lisää kulutustieto'
      }
      submitMethod={async (data: UtilityDataType, files?) => {
        /**Make sure the submit data modal correctly sets default values for select elements! Otherwise this doesn't work */

        await ACreateUtilityData({
          ...data,
          type: data.type || (type != UtilityType.ALL ? type : UtilityType.HEAT),
          parentId: propertyId,
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
      <div className='flex flex-col gap-4'>
        {type == UtilityType.ALL ? (
          <Group>
            <Label required>Tyyppi</Label>
            <select
              defaultValue={UtilityType.HEAT}
              name='type'
              required>
              <option
                value={UtilityType.HEAT}
                selected>
                Lämmitys
              </option>
              <option value={UtilityType.WATER}>Vesi</option>
              <option value={UtilityType.ELECTRIC}>Sähkö</option>
            </select>
          </Group>
        ) : null}

        <FormControl
          label='Määrä'
          required
          helper={'Määrä yksiköissä ' + getUnits()}
          control={
            <Input
              name='unitAmount'
              placeholder='Kirjoita laskun yksikkömäärä...'
              type='number'
              step={0.01}
              min={0.01}
            />
          }
        />

        <FormControl
          required
          label='Laskun Hinta'
          helper='Laskun hinta euroissa.'
          control={
            <Input
              min={0.01}
              step={0.01}
              name='price'
              placeholder='Kirjoita laskun hinta...'
              type='number'
            />
          }
        />

        <FormControl
          required
          label='Laskun Päiväys'
          helper='Laskun päivämäärä.'
          control={
            <Input
              name='time'
              placeholder='Kirjoita laskun päivämäärä...'
              type='date'
            />
          }
        />
      </div>
    </SubmitModalPrefab>
  );
}
