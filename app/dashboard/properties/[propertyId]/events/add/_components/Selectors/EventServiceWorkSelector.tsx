import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getServiceWorkTypes } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { Notification } from '@/components/UI/Notification';

export const EventServiceWorkSelector = () => {
  const { eventData, updateEventData, resetEventData } = useEventFormContext();

  const {
    data: workTypes,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => await getServiceWorkTypes(eventData.target_id),
    queryKey: [`work-types-${eventData.target_id}`],
  });

  return !error ? (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan työtyyppejä...'
      boldLabelText
      label='Tehty työ'
      required
      control={
        <ChipRadioGroup
          dataArray={workTypes}
          name='service_work_type_id'
          currentValue={eventData.service_work_type_id}
          valueKey='id'
          labelKey='label'
          onChange={updateEventData}
        />
      }
    />
  ) : (
    <Notification
      variant='error'
      position='start'>
      Työtyyppien lataus epäonnistui!
    </Notification>
  );
};
