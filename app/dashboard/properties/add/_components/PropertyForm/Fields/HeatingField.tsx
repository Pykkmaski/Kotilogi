'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import React, { useEffect, useMemo } from 'react';
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
import { removeHeatingAction } from '../../actions';
import { BatchEntryType } from '@/hooks/useBatch';
import { HeatingPayloadType } from 'kotilogi-app/dataAccess/types';
import toast from 'react-hot-toast';

export function HeatingField() {
  const {
    currentHeating,
    heatingBatch,
    removeHeating,
    updateHeatingEntry,
    addHeatingEntry,
    isNew,
    refs: { heatingTypes },
  } = usePropertyFormContext();

  useEffect(() => console.log('Heating batch changed to: ', heatingBatch), [heatingBatch]);

  const setPrimary = (entry_id: number) => {
    heatingBatch.forEach(e => (e.value.is_primary = false));
    updateHeatingEntry(entry => entry.id == entry_id, { is_primary: true });
  };

  const addHeating = () => {
    const is_primary = heatingBatch.length == 0;
    addHeatingEntry({
      is_primary,
    });
  };

  const updateHeating = (e: TODO, entry_id: number) => {
    //Ignore updating if the property already has the selected heating type.
    const name = e.target.name;
    if (name === 'heating_type_id') {
      const typeId = parseInt(e.target.value);
      const existingHeating = heatingBatch.find(hb => hb.value.heating_type_id == typeId);
      if (existingHeating) {
        toast.error('Kiinteistöllä on jo tämä lämmitysmuoto!');
        return;
      }
    }

    updateHeatingEntry(item => item.id == entry_id, { [name]: e.target.value });
  };

  const deleteHeating = async (entry: BatchEntryType<HeatingPayloadType>) => {
    //Editing an existing property
    if (!isNew) {
      const loadingToast = toast.loading('Poistetaan lämmitysmuotoa...');
      await removeHeatingAction(entry.value.id)
        .then(() => toast.success('Lämmitysmuoto poistettu!'))
        .finally(() => toast.dismiss(loadingToast));
    }

    removeHeating(entry.id);
  };

  useEffect(() => {
    heatingBatch.forEach(hb => {
      if (typeof hb.value.heating_type_id == 'undefined') {
        removeHeating(hb.id);
      }
    });
  }, []);

  return (
    <BoxFieldset
      legend={
        <div className='flex justify-between w-full'>
          <h1>Lämmitys</h1>
        </div>
      }>
      <div className='flex flex-col gap-10 justify-start'>
        {heatingBatch.map(hb => {
          const className = [
            'flex gap-4 flex-col border rounded-md p-4 animate-slideup-fast',
            hb.value.is_primary ? 'bg-green-50 border-green-200' : 'bg-none border-slate-200',
          ].join(' ');

          return (
            <div className={className}>
              <FormControl
                label='Lämmitysjärjestelmän tyyppi'
                control={
                  <ChipRadioGroup
                    name='heating_type_id'
                    dataArray={heatingTypes}
                    labelKey='name'
                    valueKey='id'
                    currentValue={hb.value.heating_type_id}
                    onChange={e => updateHeating(e, hb.id)}
                  />
                }
              />

              {hb.value.heating_type_id == getIdByLabel(heatingTypes, 'Öljy', 'name') ? (
                <>
                  <FormControl
                    label='Öljysäiliön sijainti'
                    control={
                      <Input
                        value={hb.value.location}
                        name='location'
                        onChange={e => updateHeating(e, hb.id)}
                        placeholder='Anna öljysäiliön sijainti...'
                      />
                    }
                  />
                  <FormControl
                    label='Öljysäiliön tilavuus'
                    control={
                      <Input
                        name='volume'
                        value={hb.value.volume}
                        onChange={e => updateHeating(e, hb.id)}
                        type='number'
                        placeholder='Anna öljysäiliön tilavuus...'
                      />
                    }
                  />
                </>
              ) : null}
              <div className='flex w-full justify-between'>
                <Checkbox
                  label='Ensisijainen'
                  disabled={heatingBatch.length == 0}
                  checked={hb.value.is_primary || heatingBatch.length == 0}
                  onChange={() => setPrimary(hb.id)}
                />
                <IconButton
                  size='small'
                  onClick={() => deleteHeating(hb)}>
                  <Clear />
                </IconButton>
              </div>
            </div>
          );
        })}
        <div className='flex justify-start'>
          <Button
            color='secondary'
            variant='text'
            onClick={addHeating}
            startIcon={<Add />}>
            Lisää lämmitysjärjestelmä
          </Button>
        </div>
      </div>
    </BoxFieldset>
  );
}
