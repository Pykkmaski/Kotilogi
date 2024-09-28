import { FormControl, NullOption } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
import { useEventTypeContext } from '../EventTypeProvider';
import axios from 'axios';
import Spinner from '@/components/UI/Spinner';
import { useQuery } from '@tanstack/react-query';

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

  return (
    data.mainTypeId &&
    data.mainTypeId !== 'null' && (
      <FormControl
        boldLabelText
        label='Kohde'
        control={
          <select
            required
            disabled={isLoading}
            className='animate-slideup-fast'
            name='targetId'
            value={!data.targetId ? 'null' : data.targetId}>
            {isLoading ? (
              <NullOption>
                <Spinner size='1rem' />
                Ladataan...
              </NullOption>
            ) : (
              <>
                <NullOption>Valitse tapahtuman kohde...</NullOption>
                {targets.map(type => (
                  <option value={type.id}>{type.label}</option>
                ))}
              </>
            )}
          </select>
        }
      />
    )
  );
};
