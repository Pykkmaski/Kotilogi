import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ElectricHeatingMethodSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Sähkölämmitystapa'
      labelKey='label'
      valueKey='id'
      tablename='ref_electricHeatingMethodTypes'
      propertyName='electricHeatingMethodId'
      useContextValue={extraData}
    />
  );
};
