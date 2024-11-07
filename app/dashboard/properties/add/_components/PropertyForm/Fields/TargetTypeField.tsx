'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export function TargetTypeField() {
  const { property: data, refs } = usePropertyFormContext();
  console.log(data.propertyTypeId);
  return (
    <Fieldset legend='Kohde'>
      <FormControl
        label='Kohteen tyyppi'
        control={
          <ChipRadioGroup
            name='propertyTypeId'
            currentValue={data.propertyTypeId}
            labelKey='name'
            valueKey='id'
            required
            dataArray={refs.propertyTypes}
          />
        }
      />
    </Fieldset>
  );
}
