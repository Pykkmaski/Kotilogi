import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl } from '@/components/UI/FormUtils';
import Spinner from '@/components/UI/Spinner';
import { useEventFormContext } from '../../EventFormContext';
import { getAluskatetyypit } from '../actions';
import { useQuery } from '@tanstack/react-query';

export const AluskateSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: aluskatetyypit, isLoading: isAluskatteetLoading } = useQuery({
    queryKey: ['aluskatetyypit'],
    queryFn: async () => await getAluskatetyypit(),
  });

  return (
    <FormControl
      label='Aluskate'
      control={
        <RadioGroup name='aluskateTyyppiId'>
          {isAluskatteetLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan aluskateTyyppejä...'
            />
          ) : (
            aluskatetyypit.map(t => (
              <ChipButton
                label={t.label}
                value={t.id}
                checked={extraData && extraData.aluskateTyyppiId == t.id}
              />
            ))
          )}
        </RadioGroup>
      }
    />
  );
};
