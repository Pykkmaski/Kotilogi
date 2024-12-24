import { BoxFieldset } from '@/components/UI/Fieldset';
import { Checkbox, CheckboxLabel, FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';

import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function OtherInfoField() {
  const {
    property: data,
    refs: { propertyTypes, energyClasses },
    updateData,
  } = usePropertyFormContext() as TODO;

  return (
    <BoxFieldset legend='Muut tiedot'>
      <div className='flex flex-col gap-4 w-full'>
        <FormControl
          label='Energialuokka'
          control={
            <ChipRadioGroup
              onChange={updateData}
              name='energy_class_id'
              dataArray={energyClasses}
              labelKey='name'
              valueKey='id'
              currentValue={data.energy_class_id}
            />
          }
        />
        <CheckboxLabel
          label='Autotalli'
          control={
            <Checkbox
              data-testid='garage-checkbox'
              name='has_garage'
              defaultChecked={data.has_garage}
              onChange={updateData}
            />
          }
        />
        <RenderOnCondition condition={data.property_type_id == propertyTypes['Huoneisto']}>
          <CheckboxLabel
            label='Parveke'
            control={
              <Checkbox
                data-testid='balcony-checkbox'
                name='hasBalcony'
                defaultChecked={data.hasBalcony}
                onChange={updateData}
              />
            }
          />
        </RenderOnCondition>
      </div>
    </BoxFieldset>
  );
}
