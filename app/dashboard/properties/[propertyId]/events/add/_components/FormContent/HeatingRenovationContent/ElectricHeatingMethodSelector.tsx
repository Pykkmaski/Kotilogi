import { useQuery } from '@tanstack/react-query';
import { useEventFormContext } from '../../EventFormContext';
import { getElectricHeatingMethods } from '../actions';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const ElectricHeatingMethodSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: methods, isLoading } = useQuery({
    queryKey: ['electricHeatingMethods'],
    queryFn: async () => await getElectricHeatingMethods(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan sähkölämmitystapoja...'
      required
      label='Sähkölämmitystapa'
      control={
        <ChipRadioGroup
          name='methodId'
          valueKey='id'
          labelKey='label'
          currentValue={extraData.methodId}
          dataArray={methods}
        />
      }
    />
  );
};
