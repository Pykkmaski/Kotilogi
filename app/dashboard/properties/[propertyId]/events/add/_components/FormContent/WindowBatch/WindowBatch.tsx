'use client';

import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import React, { useEffect, useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import { Add, Clear } from '@mui/icons-material';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

export const WindowBatch = () => {
  const {
    windows,
    addWindowEntry,
    removeWindowEntry,
    resetWindowBatch,
    updateWindowEntry,
    eventData,
    refs,
  } = useEventFormContext();

  const addWindow = () => {
    addWindowEntry({});
  };

  const removeWindow = (windowBatchId: number) => {
    const c = confirm('Haluatko varmasti poistaa valitun ikkunan?');
    if (!c) return;
    removeWindowEntry(windowBatchId);
  };

  const updateWindow = (e: TODO, windowBatchId: number) => {
    updateWindowEntry(entry => entry.id == windowBatchId, { [e.target.name]: e.target.value });
  };

  return (
    <div className='flex flex-col gap-4'>
      {windows.map((w, index) => {
        return (
          <div
            className='border border-slate-200 rounded-md p-2'
            key={`window-inputs-${index}`}>
            <div className='flex w-full items-center justify-between'>
              <h1 className='font-semibold'>Ikkuna {index + 1}</h1>
              <IconButton
                size='small'
                onClick={() => removeWindow(w.id)}>
                <Clear />
              </IconButton>
            </div>

            <FormControl
              label='Ikkunan nimi'
              control={
                <Input
                  name='title'
                  placeholder='Anna ikkunalle vaihtoehtoinen nimi...'
                  onChange={e => updateWindow(e, w.id)}
                />
              }
            />

            <FormControl
              required
              label='U-Arvo'
              control={
                <Input
                  name='u_value'
                  placeholder='Anna ikkunan u-arvo'
                  type='number'
                  min={0}
                  step={0.01}
                  title='U-arvo eli lämmönläpäisykerroin kertoo, kuinka paljon ikkuna läpäisee lämpöä.  Mitä pienempi U-arvo on, sitä parempi lämmöneristys ikkunassa on.'
                  value={w.value.u_value}
                  onChange={e => updateWindow(e, w.id)}
                />
              }
            />
            <FormControl
              required
              label={
                <>
                  Vähimmäisäänieristyskyky <sup>dB</sup>
                </>
              }
              control={
                <Input
                  name='min_db_rating'
                  placeholder='Anna ikkunan vähimmäisäänieristyskyky...'
                  type='number'
                  min={0}
                  step={1}
                  value={w.value.min_db_rating}
                  onChange={e => updateWindow(e, w.id)}
                />
              }
            />

            <FormControl
              required
              label={
                <>
                  Enimmäisäänieristyskyky <sup>dB</sup>
                </>
              }
              control={
                <Input
                  name='max_db_rating'
                  placeholder='Anna ikkunan enimmäiseristyskyky...'
                  type='number'
                  min={0}
                  step={1}
                  value={w.value.max_db_rating}
                  onChange={e => updateWindow(e, w.id)}
                />
              }
            />

            <FormControl
              required
              label='Määrä'
              control={
                <Input
                  name='count'
                  placeholder='Anna ikkunoiden määrä...'
                  type='number'
                  min={1}
                  step={1}
                  value={w.value.count}
                  onChange={e => updateWindow(e, w.id)}
                />
              }
            />
          </div>
        );
      })}
      <div className='flex w-full'>
        <Button
          color='secondary'
          onClick={() => addWindow()}
          startIcon={<Add />}>
          Lisää Ikkuna
        </Button>
      </div>
    </div>
  );
};
