import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventFormContext } from './EventFormContext';
import { EventServiceWorkSelector } from './Selectors/EventServiceWorkSelector';
import { EventTargetSelector } from './Selectors/EventTargetSelector';

export function ServiceWorkContent() {
  return (
    <>
      <EventTargetSelector />
      <EventServiceWorkSelector />
    </>
  );
}
