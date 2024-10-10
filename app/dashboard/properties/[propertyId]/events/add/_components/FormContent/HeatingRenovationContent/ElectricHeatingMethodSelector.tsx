import { useQuery } from '@tanstack/react-query';
import { useEventFormContext } from '../../EventFormContext';
import { getElectricHeatingMethods } from '../actions';
import Spinner from '@/components/UI/Spinner';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

export const ElectricHeatingMethodSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: methods, isLoading } = useQuery({
    queryKey: ['electricHeatingMethods'],
    queryFn: async () => await getElectricHeatingMethods(),
  });

  return isLoading ? (
    <Spinner
      size='1rem'
      message='Ladataan sähkölämmitystapoja...'
    />
  ) : (
    <FormControl
      required
      label='Sähkölämmitystapa'
      control={
        <RadioGroup name='methodId'>
          {methods.map((m, i) => (
            <ChipButton
              required
              value={m.id}
              label={m.label}
              checked={extraData && extraData.methodId == m.id}
              key={`ehm-${i}`}
            />
          ))}
        </RadioGroup>
      }
    />
  );
};
