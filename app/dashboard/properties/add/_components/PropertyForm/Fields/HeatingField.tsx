'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import React, { useEffect } from 'react';
import { usePropertyFormContext } from '../../PropertyFormContext';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../actions';
import { Checkbox } from '@/components/Feature/RadioGroup/Checkbox';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { Button } from '@/components/New/Button';
import { Add, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export function HeatingField() {
  const {
    currentHeating,
    heatingBatch,
    updateHeatingData,
    removeHeating,
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

  const addHeatingEntry = () => {
    const is_primary = heatingBatch.length == 0;
    addHeating({
      ...currentHeating,
      is_primary,
    });
  };

  return (
    <BoxFieldset
      legend={
        <div className='flex justify-between w-full'>
          <h1>Lämmitys</h1>
          <Button
            startIcon={<Add />}
            color='secondary'
            onClick={() => addHeatingEntry()}
            disabled={Object.entries(currentHeating).length == 0}>
            Lisää lämmitysmuoto
          </Button>
        </div>
      }>
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

        {currentHeating.heating_type_id == getIdByLabel(heatingTypes, 'Öljy', 'name') ? (
          <>
            <FormControl
              label='Öljysäiliön sijainti'
              control={
                <Input
                  name='location'
                  onChange={updateHeatingData}
                  placeholder='Anna öljysäiliön sijainti...'
                />
              }
            />
            <FormControl
              label='Öljysäiliön tilavuus'
              control={
                <Input
                  name='volume'
                  onChange={updateHeatingData}
                  type='number'
                  placeholder='Anna öljysäiliön tilavuus...'
                />
              }
            />
          </>
        ) : null}

        <div className='flex flex-col gap-2 justify-start lg:w-[50%] w-full'>
          <h1>Lisätyt lämmitysmuodot</h1>
          {heatingBatch.map(hb => (
            <div className='flex gap-4 justify-between bg-slate-100 p-1 items-center'>
              <span>{heatingTypes.find(t => t.id == hb.value.heating_type_id)?.name}</span>

              <div className='flex gap-4 items-center'>
                <Checkbox
                  onChange={() => setPrimary(hb.id)}
                  checked={hb.value.is_primary}
                  label={'Ensisijainen'}
                />
                <IconButton
                  size='small'
                  onClick={() => removeHeating(hb.id)}>
                  <Clear />
                </IconButton>
              </div>
            </div>
          ))}
          <div className='flex justify-start mt-4'></div>
        </div>
      </div>
    </BoxFieldset>
  );
}
