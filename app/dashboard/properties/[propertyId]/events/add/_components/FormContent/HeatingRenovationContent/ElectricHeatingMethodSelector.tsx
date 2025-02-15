import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ElectricHeatingMethodSelector = () => {
  const { eventData, extraData, updateEventData, payload, updatePayload } = useEventFormContext();

  return (
    <OptionSelector
      label='Sähkölämmitystapa'
      labelKey='label'
      valueKey='label'
      tablename='types.electric_heating_type'
      name='electric_heating_method_type'
      value={payload.electric_heating_method_type || ''}
      onChange={updatePayload}
    />
  );
};
