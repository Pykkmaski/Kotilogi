import { useQuery } from '@tanstack/react-query';
import { getOtsalautatyypit } from '../actions';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import Spinner from '@/components/UI/Spinner';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';

export const OtsalautaSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: otsalautatyypit, isLoading: isOtsalaudatLoading } = useQuery({
    queryKey: ['otsalautatyypit'],
    queryFn: async () => await getOtsalautatyypit(),
  });

  return (
    <FormControl
      label='Otsalaudat'
      control={
        <RadioGroup name='otsalautaTyyppiId'>
          {isOtsalaudatLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan otsalautatyyppejä...'
            />
          ) : (
            otsalautatyypit.map(t => (
              <ChipButton
                label={t.label}
                value={t.id}
                checked={extraData.otsalautaTyyppiId == t.id}
              />
            ))
          )}
        </RadioGroup>
      }
    />
  );
};
