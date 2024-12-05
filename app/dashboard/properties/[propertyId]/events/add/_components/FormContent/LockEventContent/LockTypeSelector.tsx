import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const LockTypeSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Lukon tyyppi'
      labelKey='label'
      valueKey='id'
      tablename='locking.types'
      propertyName='lock_type_id'
      useContextValue={extraData}
    />
  );
};
