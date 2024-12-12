'use client';

import { BoxFieldset, Fieldset } from '@/components/UI/Fieldset';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function ExteriorField() {
  const { property, refs, updateData } = usePropertyFormContext();

  return (
    <BoxFieldset legend='Ulkopuoli'>
      <div className='flex flex-col gap-4 w-full'>
        <FormControl
          label='Rakennusmateriaali'
          control={
            <ChipRadioGroup
              onChange={updateData}
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
              onChange={updateData}
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
              onChange={updateData}
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
              onChange={updateData}
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
