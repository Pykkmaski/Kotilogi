import { useQuery } from '@tanstack/react-query';
import { getElectricityJobTargets } from '../actions';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const TargetSelector = () => {
  const { data: targets, isLoading } = useQuery({
    queryKey: ['electricityJobTargets'],
    queryFn: async () => getElectricityJobTargets(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan kohteita...'
      label='Kohde'
      control={
        <ChipRadioGroup
          name='jobTargetId'
          dataArray={targets}
          valueKey='id'
          labelKey='label'
        />
      }
    />
  );
};
