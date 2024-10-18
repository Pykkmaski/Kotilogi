import { useQuery } from '@tanstack/react-query';
import { getOtsalautatyypit } from '../actions';
import { useEventFormContext } from '../../EventFormContext';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const OtsalautaSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: otsalautatyypit, isLoading } = useQuery({
    queryKey: ['otsalautatyypit'],
    queryFn: async () => await getOtsalautatyypit(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      label='Otsalaudat'
      control={
        <ChipRadioGroup
          name='otsalautaTyyppiId'
          dataArray={otsalautatyypit}
          currentValue={extraData.otsalautaTyyppiId}
          labelKey='label'
          valueKey='id'
        />
      }
    />
  );
};
