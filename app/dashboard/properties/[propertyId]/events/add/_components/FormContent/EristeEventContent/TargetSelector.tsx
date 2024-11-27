import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const TargetSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Eristyskohde'
      labelKey='label'
      valueKey='id'
      tablename='insulation.targets'
      propertyName='kohdeId'
      useContextValue={extraData}
    />
  );
};
