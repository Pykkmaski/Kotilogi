import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import axios from 'axios';
import Spinner from '@/components/UI/Spinner';
import { useQuery } from '@tanstack/react-query';
import { ChipButton, RadioGroup } from '@/components/Feature/RadioGroup';

const getTargets = async (mainTypeId: number) => {
  return await axios
    .get(`/api/protected/properties/events/targets?mainTypeId=${mainTypeId}`)
    .then(res => {
      if (res.status !== 200) {
        return [];
      }

      return res.data;
    });
};

export const EventTargetSelector = () => {
  const { mainData, typeData } = useEventFormContext();

  const { isLoading, data: targets } = useQuery({
    queryKey: [`targets-${typeData.mainTypeId}`],
    queryFn: () => getTargets(typeData.mainTypeId),
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
              disabled={isLoading}></ChipButton>
          ))}
        </RadioGroup>
      }
    />
  );
};
