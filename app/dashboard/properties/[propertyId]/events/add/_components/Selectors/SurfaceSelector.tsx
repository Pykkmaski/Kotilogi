import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import { getSurfaces } from '../actions';
import Spinner from '@/components/UI/Spinner';
import { FormControl } from '@/components/UI/FormUtils';
import { useState } from 'react';

export const SurfaceSelector = () => {
  const {
    refs: { mainEventTypes },
  } = useEventTypeContext();
  const { typeData, selectedSurfaceIds, toggleSurfaceId } = useEventFormContext();

  const { data: surfaces, isLoading } = useQuery({
    queryFn: async () => await getSurfaces(),
    queryKey: [`workTypes-${typeData.mainTypeId}-${typeData.targetId}`],
  });

  return (
    <FormControl
      label='Pinnat'
      helper='Valitse yksi tai useampi.'
      control={
        <RadioGroup name='surfaceId'>
          {isLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan pintoja...'
            />
          ) : (
            surfaces.map((type, i) => (
              <ChipButton
                key={`checkbox-${i}`}
                value={type.id}
                type='checkbox'
                label={type.label}
                onChange={() => toggleSurfaceId(type.id)}
                checked={selectedSurfaceIds.includes(type.id)}
              />
            ))
          )}
        </RadioGroup>
      }
    />
  );
};
