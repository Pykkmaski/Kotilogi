import { useEventFormContext } from '../EventFormContext';
import { getSurfaces } from '../../../actions/actions';
import { CheckboxSelector } from '@/components/Feature/OptionSelector';

export const SurfaceSelector = () => {
  const { selectedSurfaceIds, toggleSurfaceId } = useEventFormContext();

  return (
    <CheckboxSelector
      label='Pinnat'
      tablename='cosmetic_renovation_events.cosmetic_renovation_target_type'
      fetchFn={getSurfaces}
      onChange={label => toggleSurfaceId(label)}
      labelKey='label'
      valueKey='label'
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
