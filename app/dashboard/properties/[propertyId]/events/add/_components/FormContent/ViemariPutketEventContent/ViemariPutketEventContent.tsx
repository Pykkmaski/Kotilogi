import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getViemariPutketAsennusTavat } from '../actions';

export const ViemariPutketEventContent = () => {
  const { eventData, updateEventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Toteutustapa'
      labelKey='label'
      valueKey='id'
      tablename='sewer_pipe.restoration_method_type'
      name='restoration_method_type_id'
      value={eventData.restoration_method_type_id}
      onChange={updateEventData}
    />
  );
};
