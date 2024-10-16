import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useEventFormContext } from '../../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEristeKohteet } from '../actions';

export const TargetSelector = () => {
  const { extraData } = useEventFormContext();
  const { data, isLoading } = useQuery({
    queryKey: ['eristekohteet'],
    queryFn: async () => getEristeKohteet(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan kohteita...'
      label='Kohde'
      required
      control={
        <ChipRadioGroup
          name='kohdeId'
          dataArray={!isLoading ? data : []}
          labelKey='label'
          valueKey='id'
          currentValue={extraData.kohdeId}
        />
      }
    />
  );
};
