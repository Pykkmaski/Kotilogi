'use client';

import { Fieldset } from '@/components/UI/Fieldset';
import React from 'react';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function HeatingField() {
  const { property: data, refs } = usePropertyFormContext();

  return (
    <Fieldset legend='Lämmitys'>
      <FormControl
        label='Ensisijainen'
        control={
          <ChipRadioGroup
            name='primaryHeatingSystemId'
            dataArray={refs.heatingTypes}
            labelKey='name'
            valueKey='id'
            currentValue={data.primaryHeatingSystemId}
          />
        }
      />

      <FormControl
        label='Toissijainen'
        control={
          <ChipRadioGroup
            name='secondaryHeatingSystemId'
            dataArray={refs.heatingTypes.filter(
              type => type.name !== 'Ei Mitään' && type.name !== 'Kaukolämpö'
            )}
            labelKey='name'
            valueKey='id'
            currentValue={data.secondaryHeatingSystemId}
          />
        }
      />
    </Fieldset>
  );
}
