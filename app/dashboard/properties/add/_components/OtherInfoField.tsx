import { Fieldset } from '@/components/UI/Fieldset';
import { Checkbox, CheckboxLabel } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';

import { AppartmentDataType } from 'kotilogi-app/dataAccess/types';

export function OtherInfoField() {
  const { property: data, propertyTypes } = usePropertyFormContext() as {
    property: AppartmentDataType;
    propertyTypes: TODO;
  };

  return (
    <Fieldset legend='Muut tiedot'>
      <CheckboxLabel
        label='Autotalli'
        control={
          <Checkbox
            data-testid='garage-checkbox'
            name='hasGarage'
            defaultChecked={data.hasGarage}
          />
        }
      />

      {data.propertyTypeId == propertyTypes['Huoneisto'] ? (
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
      ) : null}
    </Fieldset>
  );
}
