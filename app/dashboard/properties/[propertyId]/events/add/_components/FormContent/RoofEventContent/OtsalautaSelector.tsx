import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getOtsalautatyypit } from '../actions';

export const OtsalautaSelector = () => {
  const { extraData } = useEventFormContext();
  return (
    <OptionSelector
      label='Otsalautatyyppi'
      labelKey='label'
      valueKey='id'
      tablename='roofs.ref_otsalautatyypit'
      propertyName='otsalautaTyyppiId'
      useContextValue={extraData}
      fetchFn={getOtsalautatyypit}
    />
  );
};
