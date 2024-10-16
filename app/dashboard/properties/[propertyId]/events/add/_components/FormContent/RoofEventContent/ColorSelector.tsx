import { useQuery } from '@tanstack/react-query';
import { getColors } from '../actions';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import Spinner from '@/components/UI/Spinner';
import { useEventFormContext } from '../../EventFormContext';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const ColorSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: colors, isLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await getColors(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      label='Väri'
      control={
        <ChipRadioGroup
          name='colorId'
          currentValue={extraData.colorId}
          labelKey='name'
          valueKey='id'
          dataArray={colors}
        />
      }
    />
  );
};
