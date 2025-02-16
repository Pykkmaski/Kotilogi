import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getDrainageDitch, getDrainageDitchMethods } from './actions';
import { Checkbox } from '@/components/Feature/RadioGroup/Checkbox';
import { ImplementationMethodSelector } from './DrainageDitchEventContent/ImplementationMethodSelector';
import { DrainageDitchEditor } from '@/components/Feature/DrainageDitchEditor';
import { useEffect } from 'react';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';
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
