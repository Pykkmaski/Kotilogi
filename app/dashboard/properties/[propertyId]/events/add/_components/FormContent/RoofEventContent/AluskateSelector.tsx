import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl } from '@/components/UI/FormUtils';
import Spinner from '@/components/UI/Spinner';
import { useEventFormContext } from '../../EventFormContext';
import { getAluskatetyypit } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';

export const AluskateSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: aluskatetyypit, isLoading } = useQuery({
    queryKey: ['aluskatetyypit'],
    queryFn: async () => await getAluskatetyypit(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      label='Aluskate'
      control={
        <ChipRadioGroup
          name='aluskateTyyppiId'
          currentValue={extraData.aluskateTyyppiId}
          dataArray={aluskatetyypit}
          labelKey='label'
          valueKey='id'
        />
      }
    />
  );
};
