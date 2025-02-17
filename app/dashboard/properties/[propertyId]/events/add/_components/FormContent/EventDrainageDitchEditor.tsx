import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getDrainageDitch } from './actions';
import { DrainageDitchEditor } from '@/components/Feature/DrainageDitchEditor';
import { useEffect } from 'react';
import { Notification } from '@/components/UI/Notification';

export const EventDrainageDitchEditor = () => {
  const { eventData, resetEventData, updateEventData, payload, updatePayload, resetPayload } =
    useEventFormContext();
  const { data, isLoading, error } = useQuery({
    queryKey: [`drainage-ditch-data-${eventData.property_id}`],
    queryFn: async () => await getDrainageDitch(eventData.property_id),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      resetPayload(data);
    }
  }, [isLoading]);

  return isLoading ? (
    <Spinner message='Ladataan salaojatietoja...' />
  ) : error ? (
    <Notification
      variant='error'
      position='start'>
      Salaojatietojen lataus epäonnistui!
    </Notification>
  ) : (
    <DrainageDitchEditor
      drainageDitchData={payload}
      onChange={updatePayload}
    />
  );
};
