'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function ExteriorField() {
  const { property, roofTypes, roofMaterials, buildingMaterials, mainColors } =
    usePropertyFormContext();

  return (
    <Fieldset legend='Ulkopuoli'>
      <div className='flex lg:flex-col xs:flex-col w-full'>
        <FormControl
          label='Rakennusmateriaali'
          required
          control={
            <ChipRadioGroup
              dataArray={buildingMaterials}
              currentValue={property.buildingMaterialId}
              labelKey='name'
              valueKey='id'
              name={'buildingMaterialId'}
            />
          }></FormControl>

        <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
          <FormControl
            label='Väri'
            control={
              <ChipRadioGroup
                dataArray={mainColors}
                labelKey='name'
                valueKey='id'
                currentValue={property.mainColorId}
                name='mainColorId'
              />
            }
          />
        </div>
      </div>

      <div className='flex flex-row w-full mt-8'>
        <div className='flex flex-col gap-4 w-full'>
          <FormControl
            label='Katon Tyyppi'
            control={
              <ChipRadioGroup
                dataArray={roofTypes}
                labelKey='name'
                valueKey='id'
                currentValue={property.roofTypeId}
                name='roofTypeId'
              />
            }
          />
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <FormControl
            label='Katon Materiaali'
            control={
              <ChipRadioGroup
                dataArray={roofMaterials}
                labelKey='name'
                valueKey='id'
                currentValue={property.roofMaterialId}
                name='roofMaterialId'
              />
            }
          />
        </div>
      </div>
    </Fieldset>
  );
}
