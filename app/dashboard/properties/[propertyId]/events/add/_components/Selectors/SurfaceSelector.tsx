import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import { getSurfaces } from '../actions';
import Spinner from '@/components/UI/Spinner';
import { FormControl } from '@/components/UI/FormUtils';
import { useState } from 'react';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';

export const SurfaceSelector = () => {
  const { typeData, selectedSurfaceIds, toggleSurfaceId } = useEventFormContext();

  const { data: surfaces, isLoading } = useQuery({
    queryFn: async () => await getSurfaces(),
    queryKey: [`workTypes-${typeData.mainTypeId}-${typeData.targetId}`],
  });

  return isLoading ? (
    <Spinner message='Ladataan pintoja...' />
  ) : (
    <FormControl
      label='Pinnat'
      helper='Valitse yksi tai useampi.'
      control={
        <RadioGroup name='surfaceId'>
          {surfaces.map(s => {
            return (
              <ChipButton
                type='checkbox'
                label={s.label}
                value={s.id}
                onClick={() => toggleSurfaceId(s.id)}
                checked={selectedSurfaceIds.includes(s.id)}
              />
            );
          })}
        </RadioGroup>
      }
    />
  );
};
