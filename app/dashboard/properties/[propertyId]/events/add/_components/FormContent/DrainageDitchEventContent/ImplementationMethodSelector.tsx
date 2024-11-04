import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ImplementationMethodSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Toeutustapa'
      labelKey='label'
      valueKey='id'
      tablename='ref_drainageDitchMethods'
      propertyName='toteutusTapaId'
      useContextValue={extraData}
    />
  );
};
