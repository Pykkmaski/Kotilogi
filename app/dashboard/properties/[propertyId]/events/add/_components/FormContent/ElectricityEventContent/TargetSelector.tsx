import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const TargetSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Työn kohde'
      labelKey='label'
      valueKey='id'
      tablename='electricity.restoration_work_target'
      propertyName='restoration_work_target_id'
      useContextValue={extraData}
    />
  );
};
