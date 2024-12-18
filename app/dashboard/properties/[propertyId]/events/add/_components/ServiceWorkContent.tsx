import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventFormContext } from './EventFormContext';
import { EventServiceWorkSelector } from './Selectors/EventServiceWorkSelector';
import { EventTargetSelector } from './Selectors/EventTargetSelector';

export function ServiceWorkContent() {
  const { eventData, refs } = useEventFormContext();
  return (
    <>
      <EventTargetSelector />
      {eventData.target_id != getIdByLabel(refs.eventTargets, 'Lämmönjako') ? (
        <EventServiceWorkSelector />
      ) : null}
    </>
  );
}
