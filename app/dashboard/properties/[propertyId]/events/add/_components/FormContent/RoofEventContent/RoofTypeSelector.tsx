import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const RoofTypeSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Katon tyyppi'
      labelKey='name'
      valueKey='id'
      tablename='ref_roofTypes'
      propertyName='roofTypeId'
      useContextValue={extraData}
    />
  );
};
