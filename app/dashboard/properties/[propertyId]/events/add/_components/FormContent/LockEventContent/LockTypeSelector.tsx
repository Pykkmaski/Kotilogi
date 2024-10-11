import { useQuery } from '@tanstack/react-query';
import { getLockTypes } from '../actions';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import Spinner from '@/components/UI/Spinner';

export const LockTypeSelector = () => {
  const { data: lockTypes, isLoading } = useQuery({
    queryKey: ['lockTypes'],
    queryFn: async () => getLockTypes(),
  });

  return isLoading ? (
    <Spinner
      size='1rem'
      message='Ladataan lukkotyyppejä...'
    />
  ) : (
    <FormControl
      label='Lukituksen tyyppi'
      control={
        <RadioGroup name='lockTypeId'>
          {lockTypes.map(t => (
            <ChipButton
              label={t.label}
              value={t.id}
            />
          ))}
        </RadioGroup>
      }
    />
  );
};
