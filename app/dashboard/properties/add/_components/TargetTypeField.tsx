'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';

export function TargetTypeField() {
  const { propertyTypes, resetData, property: data } = usePropertyFormContext();
  return (
    <Fieldset legend='Kohde'>
      <Label
        boldText
        required>
        Tyyppi
      </Label>

      <RadioGroup name='propertyTypeId'>
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
