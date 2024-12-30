import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getDrainageDitchMethods } from '../actions';

export const ImplementationMethodSelector = () => {
  const { eventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Toeutustapa'
      labelKey='label'
      valueKey='id'
      tablename='restoration_events.drainage_ditch_implementation_method_type'
      name='toteutusTapaId'
      value={eventData.toteutusTapaId}
      fetchFn={getDrainageDitchMethods}
    />
  );
};
