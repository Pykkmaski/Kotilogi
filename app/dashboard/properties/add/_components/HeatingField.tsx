'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import React from 'react';
import { usePropertyFormContext } from './PropertyFormContext';
import assert from 'assert';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';

export function HeatingField() {
  const { property: data, heatingTypes } = usePropertyFormContext();

  return (
    <div className='flex w-full gap-2 [&>*]:w-full'>
      <Fieldset legend='Lämmitys'>
        <div className='flex xs:flex-col lg:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <Label boldText>Ensisijainen</Label>
            <RadioGroup name='primaryHeatingSystemId'>
              {heatingTypes.map(type => (
                <RadioButton
                  label={type.name}
                  value={type.id}
                />
              ))}
            </RadioGroup>
          </div>

          <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
            <Label boldText>Toissijainen</Label>

            <RadioGroup name='secondaryHeatingSystemId'>
              {heatingTypes
                .filter(type => type.name !== 'Ei Mitään' && type.name !== 'Kaukolämpö')
                .map(type => {
                  return (
                    <RadioButton
                      label={type.name}
                      value={type.id}
                    />
                  );
                })}
            </RadioGroup>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
