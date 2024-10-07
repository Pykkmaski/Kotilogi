import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import axios from 'axios';
import Spinner from '@/components/UI/Spinner';
import { useQuery } from '@tanstack/react-query';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { getEventTargets } from '../actions';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

export const EventTargetSelector = () => {
  const { mainData, typeData } = useEventFormContext();

  const { isLoading, data: targets } = useQuery({
    queryKey: [`targets-${typeData.mainTypeId}`],
    queryFn: async () => await getEventTargets(typeData.mainTypeId),
  });

  return isLoading ? (
    <Spinner
      size='1rem'
      message='Ladataan kohteita...'
    />
  ) : (
    <FormControl
      boldLabelText
      label='Kohde'
      required
      control={
        <RadioGroup name='targetId'>
          {[...targets, { id: -1, label: 'Muu' }].map((type, i) => (
            <ChipButton
              key={`target-${i}`}
              value={type.id}
              label={type.label}
              required
              name='targetId'
              checked={typeData.targetId == type.id}
              disabled={isLoading}
            />
          ))}
        </RadioGroup>
      }
    />
  );
};
