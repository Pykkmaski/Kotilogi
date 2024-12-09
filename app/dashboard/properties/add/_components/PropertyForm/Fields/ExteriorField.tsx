'use client';

import { BoxFieldset, Fieldset } from '@/components/UI/Fieldset';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function ExteriorField() {
  const { property, refs } = usePropertyFormContext();

  return (
    <BoxFieldset legend='Ulkopuoli'>
      <div className='flex flex-col gap-4 w-full'>
        <FormControl
          label='Rakennusmateriaali'
          control={
            <ChipRadioGroup
              name='building_material_id'
              dataArray={refs.buildingMaterials}
              labelKey='name'
              valueKey='id'
              currentValue={property.building_material_id}
            />
          }
        />

        <FormControl
          label='Julkisivun väri'
          control={
            <ChipRadioGroup
              name='color_id'
              dataArray={refs.mainColors}
              labelKey='name'
              valueKey='id'
              currentValue={property.color_id}
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
      </div>
    </BoxFieldset>
  );
}
