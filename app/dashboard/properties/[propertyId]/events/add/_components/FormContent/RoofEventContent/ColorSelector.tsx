import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ColorSelector = () => {
  const { extraData } = useEventFormContext();
  return (
    <OptionSelector
      label='Väri'
      labelKey='name'
      valueKey='id'
      tablename='ref_mainColors'
      propertyName='mainColorId'
      useContextValue={extraData}
    />
  );
};
