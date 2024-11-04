'use client';

import { Fieldset } from '@/components/UI/Fieldset';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function ExteriorField() {
  const { property, refs } = usePropertyFormContext();

  return (
    <Fieldset legend='Ulkopuoli'>
      <FormControl
        label='Rakennusmateriaali'
        control={
          <ChipRadioGroup
            name='buildingMaterialId'
            dataArray={refs.buildingMaterials}
            labelKey='name'
            valueKey='id'
            currentValue={property.buildingMaterialId}
          />
        }
      />

      <FormControl
        label='Julkisivun väri'
        control={
          <ChipRadioGroup
            name='mainColorId'
            dataArray={refs.mainColors}
            labelKey='name'
            valueKey='id'
            currentValue={property.mainColorId}
          />
        }
      />

      <FormControl
        label='Katon tyyppi'
        control={
          <ChipRadioGroup
            name='roofTypeId'
            dataArray={refs.roofTypes}
            labelKey='name'
            valueKey='id'
            currentValue={property.roofTypeId}
          />
        }
      />

      <FormControl
        label='Katon materiaali'
        control={
          <ChipRadioGroup
            name='roofMaterialId'
            dataArray={refs.roofMaterials}
            labelKey='name'
            valueKey='id'
            currentValue={property.roofMaterialId}
          />
        }
      />
    </Fieldset>
  );
}
