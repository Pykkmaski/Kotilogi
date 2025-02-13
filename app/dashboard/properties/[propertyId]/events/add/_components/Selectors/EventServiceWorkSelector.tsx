import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getServiceWorkTypes } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { Notification } from '@/components/UI/Notification';

export const EventServiceWorkSelector = () => {
  const { eventData, updateEventData, resetEventData, payload, updatePayload, resetPayload } =
    useEventFormContext();

  const {
    data: workTypes,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => await getServiceWorkTypes(eventData.target_type),
    queryKey: [`work-types-${eventData.target_type}`],
    enabled: eventData.target_type != undefined,
  });

  return !error ? (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan työtyyppejä...'
      boldLabelText
      label='Tehty työ'
      required
      control={
        !isLoading &&
        workTypes && (
          <ChipRadioGroup
            dataArray={workTypes}
            name='maintenance_type'
            currentValue={payload?.maintenance_type}
            valueKey='label'
            labelKey='label'
            onChange={e => {
              const value = e.target.value;
              resetPayload({
                ...payload,
                maintenance_type: value,
              });
            }}
          />
        )
      }
    />
  ) : eventData.target_type != undefined ? (
    <Notification
      variant='error'
      position='start'>
      Työtyyppien lataus epäonnistui!
    </Notification>
  ) : (
    <Notification position='start'>Aloita valitsemalla kohde.</Notification>
  );
};
