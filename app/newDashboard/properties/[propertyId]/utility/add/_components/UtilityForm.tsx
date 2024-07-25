'use client';

import { ACreateUtilityData, AUpdateUtilityData } from '@/actions/utilityData';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { FormBase } from '@/components/New/Forms/FormBase';
import { ObjectSubmissionForm } from '@/components/New/Forms/ObjectSubmissionForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getUtilityTypeLabel, UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type UtilityFormProps = {
  propertyId: string;
  utility?: UtilityDataType;
};
export function UtilityForm({ utility, propertyId }: UtilityFormProps) {
  const { data, updateData } = useInputData(utility || { parentId: propertyId });
  const [status, setStatus] = useState(FormStatus.IDLE);
  const router = useRouter();

  const action = async e => {
    e.preventDefault();
    setStatus(FormStatus.LOADING);
    await ACreateUtilityData(data)
      .then(() => router.back())
      .catch(err => toast.error(err.message));

    setStatus(FormStatus.IDLE);
  };

  return (
    <ObjectSubmissionForm
      parentId={propertyId}
      item={utility}
      createMethod={async data => {
        await ACreateUtilityData(data);
      }}
      updateMethod={async data => {
        await AUpdateUtilityData(data);
      }}>
      <SecondaryHeading>Lisää uusi kulutustieto</SecondaryHeading>
      <Fieldset legend='Tyyppi'>
        <RadioGroup groupName='type'>
          {getEnumAsDigits(UtilityType)
            .filter(type => type != UtilityType.ALL)
            .map(type => {
              return (
                <RadioButton
                  required
                  label={getUtilityTypeLabel(type)}
                  value={type}
                />
              );
            })}
        </RadioGroup>
      </Fieldset>

      <Fieldset legend='Muut tiedot'>
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
      </Fieldset>
    </ObjectSubmissionForm>
  );
}
