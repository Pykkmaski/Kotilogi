'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function TargetTypeField() {
  const { propertyTypes, resetData, property: data } = usePropertyFormContext();
  return (
    <Fieldset legend='Kohde'>
      <FormControl
        label='Tyyppi'
        control={
          <ChipRadioGroup
            dataArray={propertyTypes}
            labelKey='name'
            valueKey='id'
            currentValue={data.propertyTypeId}
            name='propertyTypeId'
          />
        }
      />
    </Fieldset>
  );
}
