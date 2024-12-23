import { HeatingEditor } from '@/components/Feature/HeatingEditor';
import { useEventFormContext } from '../EventFormContext';
import { HeatingPayloadType } from 'kotilogi-app/dataAccess/types';

export function EventHeatingEditor() {
  const { eventData, resetEventData } = useEventFormContext();

  return (
    <HeatingEditor
      heatingData={eventData.heating}
      onChange={entries => {
        resetEventData({
          ...eventData,
          heating: entries as HeatingPayloadType[],
        });
      }}
    />
  );
}
