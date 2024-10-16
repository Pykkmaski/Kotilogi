import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import Spinner from '@/components/UI/Spinner';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { getRaystastyypit } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const RaystasSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: raystastyypit, isLoading } = useQuery({
    queryKey: ['raystastyypit'],
    queryFn: async () => await getRaystastyypit(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      label='Räystästyyppi'
      control={
        <ChipRadioGroup
          name='raystasTyyppiId'
          dataArray={raystastyypit}
          labelKey='label'
          valueKey='id'
          currentValue={extraData.raystasTyyppiId}
        />
      }
    />
  );
};
