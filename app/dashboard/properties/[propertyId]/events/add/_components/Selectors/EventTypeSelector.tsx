import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const EventTypeSelector = () => {
  const {
    refs: { eventTypes },
  } = useEventTypeContext() as {
    refs: {
      eventTypes: { id: number; label: string }[];
    };
  };
  const { eventData, updateEventData } = useEventFormContext();

  return (
    <ChipRadioGroup
      currentValue={eventData.event_type_id}
      name='event_type_id'
      valueKey='id'
      labelKey='label'
      dataArray={eventTypes}
      onChange={updateEventData}
    />
  );
};
