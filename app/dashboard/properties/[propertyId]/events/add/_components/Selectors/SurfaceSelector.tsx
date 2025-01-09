import { useEventFormContext } from '../EventFormContext';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import { getSurfaces } from '../actions';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { CheckboxSelector } from '@/components/Feature/OptionSelector';

export const SurfaceSelector = () => {
  const { eventData, selectedSurfaceIds, toggleSurfaceId } = useEventFormContext();

  return (
    <CheckboxSelector
      label='Pinnat'
      tablename='cosmetic_renovation_events.cosmetic_renovation_target_type'
      fetchFn={getSurfaces}
      onChange={id => toggleSurfaceId(id)}
      labelKey='label'
      valueKey='id'
      values={selectedSurfaceIds}
    />
  );
};

/**<SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan pintoja...'
      label='Pinnat'
      helper='Valitse yksi tai useampi.'
      control={<RadioGroup name='surfaceId'>{getSurfaceButtons()}</RadioGroup>}
    /> */
