import { useEventFormContext } from './EventFormContext';
import { SurfaceSelector } from './Selectors/SurfaceSelector';

export function SurfaceWorkContent() {
  const { eventData, updateEventData } = useEventFormContext();
  return <SurfaceSelector />;
}
