import { useQuery } from '@tanstack/react-query/build/legacy';
import { useEventFormContext } from '../EventFormContext';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';
import Spinner from '@/components/UI/Spinner';
import { Notification } from '@/components/UI/Notification';
import { RoofEditor } from '@/components/Feature/RoofEditor';
import { useEffect } from 'react';
import { RoofDataType } from 'kotilogi-app/dataAccess/types';
import { getRoof } from './actions';

export function EventRoofEditor() {
  const { eventData, updateEventData, resetEventData, payload, updatePayload, resetPayload } =
    useEventFormContext();

  const { data, isLoading, error } = useQuery({
    queryKey: [`event-roof-data-${eventData.property_id}`],
    queryFn: async () => await getRoof(eventData.property_id),
  });

  useEffect(() => {
    const roofData = data;
    if (roofData) {
      resetPayload({ ...roofData });
    }
  }, [isLoading, data]);

  return isLoading ? (
    <Spinner message='Ladataan katon tietoja...' />
  ) : error ? (
    <Notification
      variant='error'
      position='start'
    />
  ) : (
    <RoofEditor
      roofData={payload as Partial<RoofDataType>}
      onChange={updatePayload}
    />
  );
}
