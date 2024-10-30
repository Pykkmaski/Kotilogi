'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Label } from '@/components/UI/FormUtils';
import React from 'react';
import { usePropertyFormContext } from './PropertyFormContext';
import assert from 'assert';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function HeatingField() {
  const { property: data, heatingTypes } = usePropertyFormContext();

  return (
    <div className='flex w-full gap-2 [&>*]:w-full'>
      <Fieldset legend='Lämmitys'>
        <FormControl
          label='Ensisijainen'
          control={
            <ChipRadioGroup
              dataArray={heatingTypes}
              labelKey='name'
              valueKey='id'
              currentValue={data.primaryHeatingSystemId}
              name='primaryHeatingSystemId'
            />
          }
        />

        <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
          <FormControl
            label='Toissijainen'
            control={
              <ChipRadioGroup
                dataArray={heatingTypes.filter(
                  type => type.name !== 'Ei Mitään' && type.name !== 'Kaukolämpö'
                )}
                labelKey='name'
                valueKey='id'
                currentValue={data.secondaryHeatingSystemId}
                name='secondaryHeatingSystemId'
              />
            }
          />
        </div>
      </Fieldset>
    </div>
  );
}
