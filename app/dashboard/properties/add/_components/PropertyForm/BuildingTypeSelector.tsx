'use client';

import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { usePropertyFormContext } from '../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';

export function BuildingTypeSelector() {
  const { property, refs } = usePropertyFormContext();

  return (
    <FormControl
      label='Talotyyppi'
      control={
        <ChipRadioGroup
          dataArray={refs.buildingTypes}
          labelKey='name'
          valueKey='id'
          currentValue={property.buildingTypeId}
          name='buildingTypeId'
        />
      }
    />
  );
}
