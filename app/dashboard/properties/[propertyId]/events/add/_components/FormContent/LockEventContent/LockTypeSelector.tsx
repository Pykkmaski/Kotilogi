import { useQuery } from '@tanstack/react-query';
import { getLockTypes } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const LockTypeSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Lukon tyyppi'
      labelKey='label'
      valueKey='id'
      tablename='ref_lockTypes'
      propertyName='lockTypeId'
      useContextValue={extraData}
    />
  );
};
