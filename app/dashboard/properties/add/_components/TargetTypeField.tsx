'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';

export function TargetTypeField() {
  const { propertyTypes, resetData, property: data } = usePropertyFormContext();
  return (
    <Fieldset legend='Kohde'>
      <Label
        boldText
        required>
        Tyyppi
      </Label>

      <RadioGroup groupName='propertyTypeId'>
        {propertyTypes.map(({ name, id }) => (
          <RadioButton
            label={name}
            value={id}
            required
            type='radio'
            data-testid={`property-type-id-radio-${id}`}
            onChange={e => {
              resetData({
                propertyTypeId: e.target.value,
                streetAddress: '',
                zipCode: '',
              });
            }}
            defaultChecked={name == 'Kiinteistö'}
            checked={data.propertyTypeId == id}
          />
        ))}
      </RadioGroup>
    </Fieldset>
  );
}
