'use client';

import { ACreateUtilityData, AUpdateUtilityData } from '@/actions/utilityData';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { ObjectSubmissionForm } from '@/components/New/Forms/ObjectSubmissionForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { UtilityDataType } from 'kotilogi-app/models/types';

type UtilityFormProps = {
  propertyId: string;
  utility?: UtilityDataType;
  utilityTypes: { id: number; name: string }[];
};

export function UtilityForm({ utility, propertyId, utilityTypes }: UtilityFormProps) {
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
        <RadioGroup groupName='typeId'>
          {utilityTypes.map(type => {
            return (
              <RadioButton
                required
                label={type.name}
                value={type.id}
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
