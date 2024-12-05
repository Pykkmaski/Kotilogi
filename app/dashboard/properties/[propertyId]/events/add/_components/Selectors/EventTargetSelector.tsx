'use client';

import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEventTargets } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';

export const EventTargetSelector = () => {
  const { eventData, updateEventData } = useEventFormContext();

  const { isLoading, data: targets } = useQuery({
    queryKey: [`targets-${eventData.target_id}`],
    queryFn: async () => await getEventTargets(eventData.event_type_id),
  });

  return (
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
  );
};
