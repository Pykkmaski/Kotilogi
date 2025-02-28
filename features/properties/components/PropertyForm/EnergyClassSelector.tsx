'use client';

import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { usePropertyFormContext } from '../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';

export function BuildingTypeSelector() {
  const { property, refs } = usePropertyFormContext();

  return (
    <FormControl
      label='Energialuokka'
      control={
        <ChipRadioGroup
          dataArray={refs.energyClasses}
          labelKey='name'
          valueKey='id'
          currentValue={property.energy_class_id}
          name='energy_class_id'
        />
      }
    />
  );
}
