import { useQuery } from '@tanstack/react-query';
import { getDrainageDitchMethods } from '../actions';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import Spinner from '@/components/UI/Spinner';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useEventFormContext } from '../../EventFormContext';

export const ImplementationMethodSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: drainageDitchMethods, isLoading } = useQuery({
    queryKey: ['drainageDitchMethod'],
    queryFn: async () => await getDrainageDitchMethods(),
  });

  return (
    <FormControl
      label='Toteutustapa'
      required
      control={
        <RadioGroup name='toteutusTapaId'>
          {isLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan toteutustapoja...'
            />
          ) : (
            drainageDitchMethods.map(m => (
              <ChipButton
                value={m.id}
                label={m.label}
                checked={extraData && extraData.toteutusTapaId == m.id}
              />
            ))
          )}
        </RadioGroup>
      }
    />
  );
};
