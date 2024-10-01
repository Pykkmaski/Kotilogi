import { FormControl } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
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
  const { event: data } = useEventContext();

  const { isLoading, data: targets } = useQuery({
    queryKey: [`targets-${data.mainTypeId}`],
    queryFn: () => getTargets(data.mainTypeId),
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
          {targets.map(type => (
            <ChipButton
              value={type.id}
              label={type.label}
              required
              name='targetId'
              checked={data.targetId == type.id}
              disabled={isLoading}></ChipButton>
          ))}

          <ChipButton
            required
            value={-1}
            name='targetId'
            label='Muu'
            checked={data.targetId == -1}
          />
        </RadioGroup>
      }
    />
  );
};
