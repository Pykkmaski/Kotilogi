import { Fieldset } from '@/components/UI/Fieldset';
import { Checkbox, CheckboxLabel } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { PropertyType } from 'kotilogi-app/dataAccess/enums/PropertyType';
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
              name='hasBalcony'
              defaultChecked={data.hasBalcony}
            />
          }
        />
      ) : null}
    </Fieldset>
  );
}
