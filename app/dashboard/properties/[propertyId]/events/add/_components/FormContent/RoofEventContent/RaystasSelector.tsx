import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import Spinner from '@/components/UI/Spinner';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { getRaystastyypit } from '../actions';
import { useQuery } from '@tanstack/react-query';

export const RaystasSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: raystastyypit, isLoading: isRaystasLoading } = useQuery({
    queryKey: ['raystastyypit'],
    queryFn: async () => await getRaystastyypit(),
  });

  return (
    <FormControl
      label='Räystästyyppi'
      control={
        <RadioGroup name='raystasTyyppiId'>
          {isRaystasLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan räystästyyppejä...'
            />
          ) : (
            raystastyypit.map(t => (
              <ChipButton
                label={t.label}
                value={t.id}
                checked={extraData.raystasTyyppiId == t.id}
              />
            ))
          )}
        </RadioGroup>
      }
    />
  );
};
