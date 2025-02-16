import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

/**@deprecated */
export function RoofField() {
  const {
    updateData,
    refs,
    data: property,
  } = usePropertyFormContext() as {
    [x: string]: any;
    property: any;
  };
  return (
    <BoxFieldset legend='Katto'>
      <div className='flex flex-col gap-4 w-full'>
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
