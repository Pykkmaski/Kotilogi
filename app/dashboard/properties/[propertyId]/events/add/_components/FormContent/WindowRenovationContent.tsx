'use client';

import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { getRooms } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const WindowRenovationContent = () => {
  const { extraData: windowData } = useEventFormContext();
  const { data: rooms, isLoading: roomsLoading } = useQuery({
    queryKey: ['room-windows'],
    queryFn: async () => await getRooms(),
  });

  return (
    <div className='flex flex-col gap-2'>
      <SuspenseFormControl
        isLoading={roomsLoading}
        loadingText='Ladataan huoneita...'
        required
        label='Huone'
        control={
          <ChipRadioGroup
            name='roomId'
            valueKey='id'
            labelKey='label'
            dataArray={rooms}
          />
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
