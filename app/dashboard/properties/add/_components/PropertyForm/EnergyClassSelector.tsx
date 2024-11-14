'use client';

import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { usePropertyFormContext } from '../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';

export function BuildingTypeSelector() {
  const { property, refs } = usePropertyFormContext();
  console.log(property.energyClassId);
  return (
    <FormControl
      label='Energialuokka'
      control={
        <ChipRadioGroup
          dataArray={refs.energyClasses}
          labelKey='name'
          valueKey='id'
          currentValue={property.energyClassId}
          name='energyClassId'
        />
      }
    />
  );
}
