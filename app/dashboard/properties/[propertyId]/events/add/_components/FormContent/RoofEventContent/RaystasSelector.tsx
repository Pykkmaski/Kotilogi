import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const RaystasSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Räystästyyppi'
      labelKey='label'
      valueKey='id'
      tablename='ref_raystastyypit'
      propertyName='raystasTyyppiId'
      useContextValue={extraData}
    />
  );
};
