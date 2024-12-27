import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const TargetSelector = () => {
  const { eventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Työn kohde'
      labelKey='label'
      valueKey='id'
      tablename='electricity.restoration_work_target_id'
      name='restoration_work_target_id'
      value={eventData.restoration_work_target_id}
    />
  );
};
