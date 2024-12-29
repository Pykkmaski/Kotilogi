import { useEventFormContext } from './EventFormContext';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { SurfaceSelector } from './Selectors/SurfaceSelector';

export function SurfaceWorkContent() {
  const { eventData, updateEventData } = useEventFormContext();
  return (
    <>
      <EventTargetSelector />
      <SurfaceSelector />
    </>
  );
}
