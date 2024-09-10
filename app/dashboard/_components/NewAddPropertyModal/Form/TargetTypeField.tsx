'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';

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
        {Object.entries(propertyTypes).map(([name, id]: [name: string, id: number]) => (
          <RadioButton
            label={name}
            value={id}
            required
            type='radio'
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
