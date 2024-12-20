import { useEventFormContext } from '../EventFormContext';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import { getSurfaces } from '../actions';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';

export const SurfaceSelector = () => {
  const { typeData, selectedSurfaceIds, toggleSurfaceId } = useEventFormContext();

  const { data: surfaces, isLoading } = useQuery({
    queryFn: async () => await getSurfaces(),
    queryKey: [`workTypes-${typeData.mainTypeId}-${typeData.targetId}`],
  });

  const getSurfaceButtons = () => {
    return isLoading
      ? null
      : surfaces.map(s => {
          return (
            <ChipButton
              type='checkbox'
              name='surfaceId'
              label={s.label}
              value={s.id}
              onClick={() => toggleSurfaceId(s.id)}
              checked={selectedSurfaceIds.includes(s.id)}
            />
          );
        });
  };

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan pintoja...'
      label='Pinnat'
      helper='Valitse yksi tai useampi.'
      control={<RadioGroup name='surfaceId'>{getSurfaceButtons()}</RadioGroup>}
    />
  );
};
