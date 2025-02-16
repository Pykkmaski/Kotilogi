'use client';

import { BoxFieldset } from '@/components/UI/BoxFieldset';
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
import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';

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
    const rawName = e.target.name;
    const name = rawName.includes('type-id')
      ? 'heating_type_id'
      : rawName.includes('brand')
      ? 'brand'
      : rawName.includes('model')
      ? 'model'
      : rawName.includes('volume')
      ? 'volume'
      : rawName.includes('location')
      ? 'location'
      : rawName.includes('name')
      ? 'name'
      : rawName;

    const value = e.target.value;

    if (
      name === 'heating_type_id' &&
      (value == getIdByLabel(heatingTypes, 'Kaukolämpö', 'name') ||
        value == getIdByLabel(heatingTypes, 'Öljylämmitys', 'name'))
    ) {
      //Ignore updating if the property already has the selected heating type.
      const existingHeating = heatingBatch.find(hb => hb.value.heating_type_id == parseInt(value));

      if (existingHeating) {
        toast.error('Kiinteistöllä on jo tämä lämmitysmuoto!');
        return;
      }
    }

    updateHeatingEntry(item => item.id == entry_id, { [name]: value });
  };

  const deleteHeating = async (entry: BatchEntryType<HeatingPayloadType>) => {
    //Only ask for confirmation if the heating has been defined.
    if (typeof entry.value.heating_type_id != 'undefined') {
      const c = confirm('Haluatko varmasti poistaa lämmitysmuodon?');
      if (!c) return;
    }

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
      const entriesToRemove = [];
      heatingBatch.forEach(hb => {
        if (typeof hb.value.heating_type_id == 'undefined') {
          entriesToRemove.push(hb.id);
        }
      });
      entriesToRemove.forEach(id => removeHeating(id));
    };
  }, []);

  return (
    <div className='flex flex-col gap-10 justify-start w-full'>
      {heatingBatch.map((hb, batchIndex) => {
        const className = [
          'flex gap-4 flex-col border rounded-md p-4 shadow-md',
          hb.value.is_primary
            ? 'bg-blue-50 border-blue-200 shadow-blue-200'
            : 'bg-none border-slate-200',
        ].join(' ');

        return (
          <div className={className}>
            <div className='flex w-full justify-between'>
              <h1 className='font-semibold'>Lämmitysmuoto {batchIndex + 1}</h1>
              <IconButton
                size='small'
                onClick={() => deleteHeating(hb)}>
                <Clear />
              </IconButton>
            </div>

            <FormControl
              label='Lämmitysjärjestelmän tyyppi'
              control={
                <div className='grid lg:grid-cols-3 xs:grid-cols-2 gap-2'>
                  {putOtherOptionLast(heatingTypes).map((ht, index) => {
                    return (
                      <ChipButton
                        type='radio'
                        label={ht.name as any}
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
                      name={`${batchIndex}-brand`}
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
                      name={`${batchIndex}-model`}
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
                      name={`${batchIndex}-location`}
                      onChange={e => updateHeating(e, hb.id)}
                      placeholder='Anna öljysäiliön sijainti...'
                    />
                  }
                />
                <FormControl
                  label='Öljysäiliön tilavuus'
                  control={
                    <Input
                      name={`${batchIndex}-volume`}
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
                      name={`${batchIndex}-brand`}
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
                      name={`${batchIndex}-model`}
                      onChange={e => updateHeating(e, hb.id)}
                      placeholder='Anna lämmönjakokeskuksen malli...'
                    />
                  }
                />
              </>
            ) : hb.value.heating_type_id == getIdByLabel(heatingTypes, 'Ilmalämpöpumppu', 'name') ||
              hb.value.heating_type_id == getIdByLabel(heatingTypes, 'Sähkö', 'name') ||
              hb.value.heating_type_id ==
                getIdByLabel(heatingTypes, 'Vesi-Ilmalämpöpumppu', 'name') ? (
              <>
                <FormControl
                  label='Lämmitysmuodon nimi'
                  required
                  helper='Nimi voi olla vapaamuotoinen ja sitä käytetään myöhemmin lämmitysmuodon tunnistamiseen.'
                  control={
                    <Input
                      name={`${batchIndex}-name`}
                      placeholder='Anna lämmitysmuodon nimi...'
                      value={hb.value.name}
                      onChange={e => updateHeating(e, hb.id)}
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
  );
}
