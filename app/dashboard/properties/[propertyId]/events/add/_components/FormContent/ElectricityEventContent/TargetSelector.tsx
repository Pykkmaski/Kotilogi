import { useQuery } from '@tanstack/react-query';
import { getElectricityJobTargets, getLockTypes } from '../actions';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import Spinner from '@/components/UI/Spinner';

export const TargetSelector = () => {
  const { data: targets, isLoading } = useQuery({
    queryKey: ['electricityJobTargets'],
    queryFn: async () => getElectricityJobTargets(),
  });

  return isLoading ? (
    <Spinner
      size='1rem'
      message='Ladataan kohteita...'
    />
  ) : (
    <FormControl
      label='Kohde'
      control={
        <RadioGroup name='jobTargetId'>
          {targets.map(t => (
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
