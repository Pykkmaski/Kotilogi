import { BoxFieldset } from '@/components/UI/Fieldset';
import { Checkbox, CheckboxLabel } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';

import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export function OtherInfoField() {
  const {
    property: data,
    refs: { propertyTypes },
  } = usePropertyFormContext() as TODO;

  return (
    <BoxFieldset legend='Muut tiedot'>
      <div className='flex flex-col gap-4 w-full'>
        <CheckboxLabel
          label='Autotalli'
          control={
            <Checkbox
              data-testid='garage-checkbox'
              name='hasGarage'
              defaultChecked={data.has_garage}
            />
          }
        />
        <RenderOnCondition condition={data.propertyTypeId == propertyTypes['Huoneisto']}>
          <CheckboxLabel
            label='Parveke'
            control={
              <Checkbox
                data-testid='balcony-checkbox'
                name='hasBalcony'
                defaultChecked={data.hasBalcony}
              />
            }
          />
        </RenderOnCondition>
      </div>
    </BoxFieldset>
  );
}
