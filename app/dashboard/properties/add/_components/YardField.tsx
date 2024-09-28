'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';
import { HouseDataType } from 'kotilogi-app/dataAccess/types';

export function YardField() {
  const {
    property: data,
    yardOwnershipTypes,
    propertyTypes,
  } = usePropertyFormContext() as {
    property: HouseDataType;
    yardOwnershipTypes: TODO;
    propertyTypes: TODO;
  };

  return data.propertyTypeId == propertyTypes.find(type => type.name === 'Kiinteistö').id ? (
    <Fieldset legend='Tontti'>
      <Label boldText>Omistus</Label>

      {data &&
      data.yardOwnershipTypeId != yardOwnershipTypes.find(type => type.name == 'Ei Mitään').id ? (
        <Group>
          <Label>
            Pinta-ala <sup className='text-super'>m2</sup>
          </Label>
          <Input
            data-testid='yard-area-input'
            name='yardArea'
            type='number'
            step={0.1}
            min={0.1}
            placeholder='Anna tontin pinta-ala...'
            defaultValue={data.yardArea}
          />
        </Group>
      ) : null}
    </Fieldset>
  ) : null;
}
