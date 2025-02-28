'use client';

import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { FormControl, Group, Input, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function YardField() {
  const { property: data, refs, updateByKey } = usePropertyFormContext() as TODO;

  const updateData = e => updateByKey('yard', e);

  return data.property_type_id == refs.propertyTypes.find(type => type.name === 'Kiinteistö').id ? (
    <div className='flex flex-col gap-4 w-full'>
      <FormControl
        label='Omistus'
        control={
          <ChipRadioGroup
            name='yardOwnershipTypeId'
            valueKey='id'
            labelKey='name'
            currentValue={data.yard?.yardOwnershipTypeId}
            dataArray={refs.yardOwnershipTypes}
            onChange={updateData}
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
            defaultValue={data.yard?.yardArea}
            onChange={updateData}
          />
        </Group>
      ) : null}
    </div>
  ) : null;
}
