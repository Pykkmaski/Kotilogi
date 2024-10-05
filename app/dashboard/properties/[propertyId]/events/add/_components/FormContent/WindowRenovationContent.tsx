'use client';

import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { Button, IconButton } from '@mui/material';
import { Add, Clear, Delete } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import { getRooms } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { ChipButton, RadioGroup } from '@/components/Feature/RadioGroup';
import Spinner from '@/components/UI/Spinner';

export const WindowRenovationContent = () => {
  const { extraData: windowData } = useEventFormContext();
  const { data: rooms, isLoading: roomsLoading } = useQuery({
    queryKey: ['room-windows'],
    queryFn: async () => await getRooms(),
  });

  return (
    <div className='flex flex-col gap-2'>
      <FormControl
        required
        label='Huone'
        control={
          roomsLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan huoneita...'
            />
          ) : (
            <RadioGroup name='roomId'>
              {rooms.map((r, i) => (
                <ChipButton
                  key={`window-room-${i}`}
                  label={r.label}
                  value={r.id}
                />
              ))}
            </RadioGroup>
          )
        }
      />
      <FormControl
        required
        label='U-Arvo'
        control={
          <Input
            name='uvalue'
            placeholder='Anna ikkunan u-arvo'
            type='number'
            min={0}
            step={0.01}
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
            name='minSoundproofing'
            placeholder='Anna ikkunan vähimmäisäänieristyskyky...'
            type='number'
            min={0}
            step={1}
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
            name='maxSoundproofing'
            placeholder='Anna ikkunan enimmäiseristyskyky...'
            type='number'
            min={0}
            step={1}
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
            value={windowData.count}
          />
        }
      />
    </div>
  );
};
