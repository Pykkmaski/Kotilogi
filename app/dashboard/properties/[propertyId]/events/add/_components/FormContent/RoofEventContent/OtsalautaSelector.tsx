import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const OtsalautaSelector = () => {
  const { extraData } = useEventFormContext();
  return (
    <OptionSelector
      label='Otsalautatyyppi'
      labelKey='label'
      valueKey='id'
      tablename='ref_otsalautatyypit'
      propertyName='otsalautaTyyppiId'
      useContextValue={extraData}
    />
  );
};
