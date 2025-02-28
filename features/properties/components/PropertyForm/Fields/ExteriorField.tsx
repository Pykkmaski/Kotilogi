'use client';

import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function ExteriorField() {
  const { property, refs, updateByKey } = usePropertyFormContext();

  return (
    <div className='flex flex-col gap-4 w-full'>
      <FormControl
        label='Rakennusmateriaali'
        control={
          <ChipRadioGroup
            onChange={e => updateByKey('building', e)}
            name='building_material_id'
            dataArray={refs.buildingMaterials}
            labelKey='name'
            valueKey='id'
            currentValue={property.building?.building_material_id}
          />
        }
      />

      <FormControl
        label='Julkisivun väri'
        control={
          <ChipRadioGroup
            onChange={e => updateByKey('building', e)}
            name='color_id'
            dataArray={refs.mainColors}
            labelKey='name'
            valueKey='id'
            currentValue={property.building?.color_id}
          />
        }
      />
    </div>
  );
}
