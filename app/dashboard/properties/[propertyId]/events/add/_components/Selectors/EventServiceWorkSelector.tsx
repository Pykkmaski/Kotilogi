import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getServiceWorkTypes } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';

export const EventWorkSelector = () => {
  const { eventData, updateEventData } = useEventFormContext();

  const { data: workTypes, isLoading } = useQuery({
    queryFn: async () => await getServiceWorkTypes(eventData.target_id),
    queryKey: [`workTypes-${eventData.target_id}`],
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
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
  );
};
