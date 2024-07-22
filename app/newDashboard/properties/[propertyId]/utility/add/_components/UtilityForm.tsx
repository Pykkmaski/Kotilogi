import { ACreateUtilityData } from '@/actions/utilityData';
import { FormBase } from '@/components/New/Forms/FormBase';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getUtilityTypeLabel, UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { redirect } from 'next/navigation';

type UtilityFormProps = {
  propertyId: string;
  utility?: UtilityDataType;
};
export function UtilityForm({ utility, propertyId }: UtilityFormProps) {
  const action = async e => {
    'use server';
    const data = {
      unitAmount: e.get('unitAmount'),
      monetaryAmount: e.get('monetaryAmount'),
      time: new Date(e.get('time')).getTime(),
      type: e.get('type'),
      parentId: propertyId,
    };

    await ACreateUtilityData(data);
    redirect(`/newDashboard/properties/${propertyId}/utility`);
  };
  return (
    <FormBase action={action}>
      <SecondaryHeading>Lisää uusi kulutustieto</SecondaryHeading>
      <FormControl
        label='Tyyppi'
        required
        control={
          <select name='type'>
            {getEnumAsDigits(UtilityType)
              .filter(type => type != UtilityType.ALL)
              .map(type => {
                return (
                  <option
                    value={type}
                    selected={utility && utility.type == type}>
                    {getUtilityTypeLabel(type)}
                  </option>
                );
              })}
          </select>
        }
      />

      <FormControl
        label='Hinta'
        required
        control={
          <Input
            type='number'
            name='monetaryAmount'
            min={0.01}
            step={0.01}
            defaultValue={utility && utility.monetaryAmount}
          />
        }
      />

      <FormControl
        label='Yksikkömäärä'
        required
        control={
          <Input
            type='number'
            name='unitAmount'
            min={0.01}
            step={0.01}
            defaultValue={utility && utility.unitAmount}
          />
        }
      />

      <FormControl
        label='Päivämäärä'
        required
        control={
          <Input
            type='date'
            name='time'
          />
        }
      />

      <div className='flex justify-end w-full'>
        <Button
          variant='contained'
          type='submit'
          startIcon={<Check />}>
          Vahvista
        </Button>
      </div>
    </FormBase>
  );
}
