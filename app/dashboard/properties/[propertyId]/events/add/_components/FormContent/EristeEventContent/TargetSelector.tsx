import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useEventFormContext } from '../../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEristeKohteet } from '../actions';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const TargetSelector = () => {
  const { extraData } = useEventFormContext();
  const { data, isLoading } = useQuery({
    queryKey: ['eristekohteet'],
    queryFn: async () => getEristeKohteet(),
  });

  return (
    <OptionSelector
      label='Eristyskohde'
      labelKey='label'
      valueKey='id'
      tablename='ref_eristeKohde'
      propertyName='targetId'
      useContextValue={extraData}
    />
  );
};
