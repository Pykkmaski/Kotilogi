import { useEventFormContext } from './EventFormContext';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { SurfaceSelector } from './Selectors/SurfaceSelector';

export function SurfaceWorkContent() {
  const { eventData } = useEventFormContext();
  return (
    <>
      <EventTargetSelector />
      {eventData.target_type && <SurfaceSelector />}
    </>
  );
}
