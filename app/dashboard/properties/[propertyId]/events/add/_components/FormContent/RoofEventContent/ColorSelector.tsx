import { useQuery } from '@tanstack/react-query';
import { getColors } from '../actions';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { FormControl } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import Spinner from '@/components/UI/Spinner';
import { useEventFormContext } from '../../EventFormContext';

export const ColorSelector = () => {
  const { extraData } = useEventFormContext();
  const { data: colors, isLoading: isColorsLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await getColors(),
  });

  return (
    <FormControl
      label='Väri'
      control={
        <RadioGroup name='colorId'>
          {isColorsLoading ? (
            <Spinner
              size='1rem'
              message='Ladataan värejä...'
            />
          ) : (
            colors.map(t => (
              <ChipButton
                label={t.name}
                value={t.id}
                checked={extraData && extraData.colorId == t.id}
              />
            ))
          )}
        </RadioGroup>
      }
    />
  );
};
