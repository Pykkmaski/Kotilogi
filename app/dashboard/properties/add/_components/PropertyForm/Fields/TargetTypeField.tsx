'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function TargetTypeField() {
  const { property: data, refs, isNew, updateData } = usePropertyFormContext();
  console.log('Adding new property: ' + isNew);

  return (
    isNew && (
      <BoxFieldset legend='Kohde'>
        <div className='flex flex-col gap-4 w-full'>
          <FormControl
            label='Kohteen tyyppi'
            control={
              <ChipRadioGroup
                name='property_type_id'
                currentValue={data.property_type_id}
                labelKey='name'
                valueKey='id'
                required
                dataArray={refs.propertyTypes}
                onChange={updateData}
              />
            }
          />
        </div>
      </BoxFieldset>
    )
  );
}
