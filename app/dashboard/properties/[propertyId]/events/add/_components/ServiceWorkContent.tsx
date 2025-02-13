import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventFormContext } from './EventFormContext';
import { EventServiceWorkSelector } from './Selectors/EventServiceWorkSelector';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { TargetType } from 'kotilogi-app/types/TargetType';

export function ServiceWorkContent() {
  const { eventData, refs } = useEventFormContext();
  return (
    <>
      <EventTargetSelector />
      {eventData.target_type != TargetType.MUU && <EventServiceWorkSelector />}
    </>
  );
}
