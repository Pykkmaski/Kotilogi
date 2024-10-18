import { useQuery } from '@tanstack/react-query';
import { getDrainageDitchMethods } from '../actions';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import Spinner from '@/components/UI/Spinner';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useEventFormContext } from '../../EventFormContext';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const ImplementationMethodSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: drainageDitchMethods, isLoading } = useQuery({
    queryKey: ['drainageDitchMethod'],
    queryFn: async () => await getDrainageDitchMethods(),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      label='Toteutustapa'
      loadingText='Ladataan toteutustapoja...'
      required
      control={
        <ChipRadioGroup
          name='toteutusTapaId'
          valueKey='id'
          labelKey='label'
          dataArray={drainageDitchMethods}
          currentValue={extraData.toteutusTapaId}
        />
      }
    />
  );
};
