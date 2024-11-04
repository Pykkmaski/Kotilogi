import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const TargetSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Työn kohde'
      labelKey='label'
      valueKey='id'
      tablename='ref_electricityJobTargets'
      propertyName='jobTargetId'
      useContextValue={extraData}
    />
  );
};
