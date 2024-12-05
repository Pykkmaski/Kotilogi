import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ElectricHeatingMethodSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Sähkölämmitystapa'
      labelKey='label'
      valueKey='id'
      tablename='heating.electric_heating_method'
      propertyName='electric_heating_method_id'
      useContextValue={extraData}
    />
  );
};
