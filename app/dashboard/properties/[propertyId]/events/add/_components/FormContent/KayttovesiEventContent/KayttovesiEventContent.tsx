import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getKayttovesiAsennusTavat } from '../actions';
import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const KayttoVesiEventContent = () => {
  const { eventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Asennustapa'
      labelKey='label'
      valueKey='id'
      tablename='restoration_events.water_pipe_installation_method_type'
      name='installation_method_id'
      value={eventData.installation_method_id}
      fetchFn={getKayttovesiAsennusTavat}
    />
  );
};
