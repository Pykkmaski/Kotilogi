import { useQuery } from '@tanstack/react-query/build/legacy';
import { useEventFormContext } from '../EventFormContext';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';
import Spinner from '@/components/UI/Spinner';
import { Notification } from '@/components/UI/Notification';
import { RoofEditor } from '@/components/Feature/RoofEditor';
import { useEffect } from 'react';
import { RoofDataType } from 'kotilogi-app/dataAccess/types';

export function EventRoofEditor() {
  const { eventData, updateEventData, resetEventData } = useEventFormContext();

  const { data, isLoading, error } = useQuery({
    queryKey: [`event-roof-data-${eventData.property_id}`],
    queryFn: async () => await getContent('roofs.overview', { property_id: eventData.property_id }),
  });

  useEffect(() => {
    const roofData = data?.at(0);
    if (roofData) {
      resetEventData({ ...eventData, ...roofData });
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
      roofData={eventData as Partial<RoofDataType>}
      onChange={updateEventData}
    />
  );
}
