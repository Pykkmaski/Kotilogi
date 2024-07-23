import { Fieldset } from '@/components/UI/Fieldset';
import { Checkbox, CheckboxLabel } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { AppartmentDataType } from 'kotilogi-app/models/types';

export function OtherInfoField() {
  const { property: data } = usePropertyFormContext() as { property: AppartmentDataType };

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

      {data.propertyType == PropertyType.APT ? (
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
