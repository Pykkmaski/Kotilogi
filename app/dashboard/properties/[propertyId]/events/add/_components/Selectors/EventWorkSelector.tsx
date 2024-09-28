import { FormControl, NullOption } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '@/components/UI/Spinner';

const fetchWorkTypes = async (targetId: number) =>
  await axios.get(`/api/protected/properties/events/workTypes?targetId=${targetId}`).then(res => {
    if (res.status !== 200) {
      return [];
    }

    return res.data;
  });

export const EventWorkSelector = () => {
  const { event: data } = useEventContext();
  const { data: workTypes, isLoading } = useQuery({
    queryFn: async () => await fetchWorkTypes(data.targetId),
    queryKey: [`workTypes-${data.mainTypeID}-${data.targetId}`],
  });

  return (
    data.targetId &&
    data.targetId !== 'null' && (
      <FormControl
        boldLabelText
        label='Tehty työ'
        required
        control={
          <select
            name='workTypeId'
            disabled={isLoading}
            value={data.workTypeId}>
            {isLoading ? (
              <NullOption>
                <Spinner size='1rem' /> Ladataan...
              </NullOption>
            ) : (
              <>
                {workTypes.map(t => (
                  <option value={t.id}>{t.label}</option>
                ))}
                <NullOption disabled={false}>Muu</NullOption>
              </>
            )}
          </select>
        }
      />
    )
  );
};
