'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import React, { useEffect } from 'react';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../actions';

export function HeatingField() {
  const {
    currentHeating,
    heatingBatch,
    updateHeatingData,
    updateHeatingEntry,
    addHeating,
    refs: { heatingTypes },
  } = usePropertyFormContext();

  useEffect(() => console.log('Heating batch changed to: ', heatingBatch), [heatingBatch]);

  const setPrimary = (entry_id: string) => {
    heatingBatch.forEach(e => (e.value.is_primary = false));
    updateHeatingEntry(
      entry => entry.id == entry_id,
      entry => {
        entry.value.is_primary = true;
      }
    );
  };

  return (
    <BoxFieldset legend='Lämmitys'>
      <div className='flex flex-col gap-4 w-full'>
        <FormControl
          label='Lämmitysjärjestelmän tyyppi'
          control={
            <ChipRadioGroup
              name='heating_type_id'
              dataArray={heatingTypes}
              labelKey='name'
              valueKey='id'
              currentValue={currentHeating.heating_type_id}
              onChange={updateHeatingData}
            />
          }
        />
        {heatingBatch.map(hb => (
          <div className='flex gap-4'>
            <span>
              Heating id: {hb.value.heating_type_id}{' '}
              {hb.value.is_primary && <span className='text-green-500'>Primary</span>}
            </span>
            <button
              type='button'
              onClick={() => setPrimary(hb.id)}>
              Set primary
            </button>
          </div>
        ))}

        <button
          type='button'
          onClick={() => addHeating(currentHeating)}
          disabled={Object.entries(currentHeating).length == 0}>
          Lisää toinen lämmitysmuoto
        </button>
      </div>
    </BoxFieldset>
  );
}
