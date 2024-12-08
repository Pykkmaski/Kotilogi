'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import { FormControl, Group, Input, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function YardField() {
  const { property: data, refs } = usePropertyFormContext() as TODO;

  return data.propertyTypeId == refs.propertyTypes.find(type => type.name === 'Kiinteistö').id ? (
    <BoxFieldset legend='Tontti'>
      <FormControl
        label='Omistus'
        control={
          <ChipRadioGroup
            name='yardOwnershipTypeId'
            valueKey='id'
            labelKey='name'
            currentValue={data.yardOwnershipTypeId}
            dataArray={refs.yardOwnershipTypes}
          />
        }
      />

      {data &&
      data.yardOwnershipTypeId !=
        refs.yardOwnershipTypes.find(type => type.name == 'Ei Mitään').id ? (
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
    </BoxFieldset>
  ) : null;
}
