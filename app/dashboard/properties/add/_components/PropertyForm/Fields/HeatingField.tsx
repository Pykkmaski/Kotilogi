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
import { Add, Clear } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { removeHeatingAction } from '../../actions';
import { BatchEntryType } from '@/hooks/useBatch';
import { HeatingPayloadType } from 'kotilogi-app/dataAccess/types';
import toast from 'react-hot-toast';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

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

  const updateHeating = async (e: TODO, entry_id: number) => {
    const name = e.target.name.includes('type-id') ? 'heating_type_id' : e.target.name;

    if (name === 'heating_type_id') {
      //Ignore updating if the property already has the selected heating type.
      const existingHeating = heatingBatch.find(
        hb => hb.value.heating_type_id == parseInt(e.target.value)
      );

      if (existingHeating) {
        toast.error('Kiinteistöllä on jo tämä lämmitysmuoto!');
        return;
      }
    }

    updateHeatingEntry(item => item.id == entry_id, { [name]: e.target.value });
  };

  const deleteHeating = async (entry: BatchEntryType<HeatingPayloadType>) => {
    const c = confirm('Haluatko varmasti poistaa lämmitysmuodon?');
    if (!c) return;
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
    return () => {
      heatingBatch.forEach(hb => {
        if (typeof hb.value.heating_type_id == 'undefined') {
          removeHeating(hb.id);
        }
      });
    };
  }, []);

  console.log(heatingBatch);

  return (
    <BoxFieldset
      legend={
        <div className='flex justify-between w-full'>
          <h1>Lämmitys</h1>
        </div>
      }>
      <div className='flex flex-col gap-10 justify-start'>
        {heatingBatch
          .sort((a, b) => (a.value.is_primary ? -1 : 1))
          .map((hb, batchIndex) => {
            const className = [
              'flex gap-4 flex-col border rounded-md p-4 animate-slideup-fast',
              hb.value.is_primary ? 'bg-blue-50 border-blue-200' : 'bg-none border-slate-200',
            ].join(' ');

            return (
              <div className={className}>
                <FormControl
                  label='Lämmitysjärjestelmän tyyppi'
                  control={
                    <div className='flex gap-1 flex-wrap'>
                      {heatingTypes.map((ht, index) => {
                        console.log(hb.value.volume);
                        return (
                          <ChipButton
                            type='radio'
                            label={ht.name}
                            onChange={e => updateHeating(e, hb.id)}
                            name={`${batchIndex}-type-id`}
                            value={ht.id}
                            checked={ht.id == hb.value.heating_type_id}
                            key={`ht-${ht.id}-${index}`}
                          />
                        );
                      })}
                    </div>
                  }
                />

                {hb.value.heating_type_id == getIdByLabel(heatingTypes, 'Öljy', 'name') ? (
                  <>
                    <FormControl
                      label='Öljylämmityskeskuksen merkki'
                      control={
                        <Input
                          value={hb.value.brand}
                          name='brand'
                          onChange={e => updateHeating(e, hb.id)}
                          placeholder='Anna öljylämmityskeskuksen merkki...'
                        />
                      }
                    />

                    <FormControl
                      label='Öljylämmityskeskuksen malli'
                      control={
                        <Input
                          value={hb.value.model}
                          name='model'
                          onChange={e => updateHeating(e, hb.id)}
                          placeholder='Anna öljylämmityskeskuksen malli...'
                        />
                      }
                    />

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
                ) : hb.value.heating_type_id == getIdByLabel(heatingTypes, 'Kaukolämpö', 'name') ? (
                  <>
                    <FormControl
                      label='Lämmönjakokeskuksen merkki'
                      control={
                        <Input
                          value={hb.value.brand}
                          name='brand'
                          onChange={e => updateHeating(e, hb.id)}
                          placeholder='Anna lämmönjakokeskuksen merkki...'
                        />
                      }
                    />

                    <FormControl
                      label='Lämmönjakokeskuksen malli'
                      control={
                        <Input
                          value={hb.value.model}
                          name='model'
                          onChange={e => updateHeating(e, hb.id)}
                          placeholder='Anna lämmönjakokeskuksen malli...'
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
