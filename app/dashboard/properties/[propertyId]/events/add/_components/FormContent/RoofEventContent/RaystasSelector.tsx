import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getRaystastyypit } from '../actions';

export const RaystasSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Räystästyyppi'
      labelKey='label'
      valueKey='id'
      tablename='roofs.ref_raystastyypit'
      name='raystasTyyppiId'
      value={extraData.raystasTyyppiId}
      fetchFn={getRaystastyypit}
    />
  );
};
