import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const AluskateSelector = () => {
  const { extraData } = useEventFormContext();
  return (
    <OptionSelector
      label='Aluskate'
      labelKey='label'
      valueKey='id'
      tablename='roofs.ref_aluskatetyypit'
      propertyName='aluskateTyyppiId'
      useContextValue={extraData}
    />
  );
};
