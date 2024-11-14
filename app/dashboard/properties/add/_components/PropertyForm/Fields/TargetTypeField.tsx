'use client';

import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function TargetTypeField() {
  const { property: data, refs } = usePropertyFormContext();
  console.log(data.propertyTypeId);
  return (
    !data && (
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
    )
  );
}
