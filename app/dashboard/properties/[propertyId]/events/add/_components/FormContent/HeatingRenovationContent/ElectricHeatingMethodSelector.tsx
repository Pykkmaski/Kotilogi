import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ElectricHeatingMethodSelector = () => {
  const { eventData, extraData, updateEventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Sähkölämmitystapa'
      labelKey='label'
      valueKey='id'
      tablename='types.electric_heating_type'
      name='electric_heating_method_type_id'
      value={eventData.electric_heating_method_type_id}
      onChange={updateEventData}
    />
  );
};
