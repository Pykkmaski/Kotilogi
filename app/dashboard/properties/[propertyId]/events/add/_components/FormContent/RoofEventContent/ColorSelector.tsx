import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getColors } from '../actions';

export const ColorSelector = () => {
  const { extraData } = useEventFormContext();
  return (
    <OptionSelector
      label='Väri'
      labelKey='name'
      valueKey='id'
      tablename='ref_mainColors'
      propertyName='colorId'
      useContextValue={extraData}
      fetchFn={getColors}
    />
  );
};
