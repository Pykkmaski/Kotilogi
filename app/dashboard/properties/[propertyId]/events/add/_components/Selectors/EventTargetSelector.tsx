'use client';

import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEventTargets } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { Notification } from '@/components/UI/Notification';

export const EventTargetSelector = () => {
  const { eventData, updateEventData } = useEventFormContext();

  const {
    isLoading,
    data: targets,
    error,
  } = useQuery({
    queryKey: [`targets-${eventData.event_type_id}`],
    queryFn: async () => await getEventTargets(eventData.event_type_id),
  });

  return !error ? (
    <SuspenseFormControl
      isLoading={isLoading}
      boldLabelText
      label='Kohde'
      required
      control={
        <ChipRadioGroup
          onChange={updateEventData}
          name='target_id'
          currentValue={eventData.target_id}
          valueKey='id'
          labelKey='label'
          dataArray={targets}
        />
      }
    />
  ) : (
    <Notification
      variant='error'
      position='start'>
      Kohteiden lataus epäonnistui!
    </Notification>
  );
};
