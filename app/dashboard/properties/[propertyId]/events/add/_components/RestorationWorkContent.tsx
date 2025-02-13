import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventFormContext } from './EventFormContext';
import { WindowBatch } from './FormContent/WindowBatch/WindowBatch';
import { EventRoofEditor } from './FormContent/EventRoofEditor';
import { ViemariPutketEventContent } from './FormContent/ViemariPutketEventContent/ViemariPutketEventContent';
import { EventDrainageDitchEditor } from './FormContent/EventDrainageDitchEditor';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { SewerPipeEditor } from '@/components/Feature/SewerPipeEditor';
import { WaterPipeEditor } from '@/components/Feature/WaterPipeEditor';
import { InsulationEditor } from '@/components/Feature/InsulationEditor';
import { ElectricalEditor } from '@/components/Feature/ElectricalEditor';
import { LockEditor } from '@/components/Feature/LockEditor';
import { LockBatch } from './FormContent/LockBatch/LockBatch';
import { HeatingRenovationContent } from './FormContent/HeatingRenovationContent/HeatingRenovationContent';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';
import { getHeatingData } from './actions';
import { Notification } from '@/components/UI/Notification';
import { HeatingEditor } from '@/components/Feature/HeatingEditor';
import Spinner from '@/components/UI/Spinner';
import { EventHeatingEditor } from './FormContent/EventHeatingEditor';
import { ExteriorCladdingEditor } from '@/components/Feature/ExteriorCladdingEditor';
import { EventType } from 'kotilogi-app/types/EventType';
import { TargetType } from 'kotilogi-app/types/TargetType';

export function RestorationWorkContent() {
  const {
    eventData,
    propertyId,
    refs,
    insulation,
    updateEventData,
    resetInsulation,
    updatePayload,
    payload,
    selectedERTargetIds,
    toggleERTargetId,
  } = useEventFormContext();

  const {
    data: heatingData,
    isLoading: heatingDataIsLoading,
    error: errorOnHeatingData,
  } = useQuery({
    queryKey: ['heating-data'],
    queryFn: async () => await getHeatingData(propertyId),
    enabled:
      eventData.event_type == EventType.PERUSKORJAUS &&
      eventData.target_type == TargetType.LÄMMITYSMUOTO,
  });

  return (
    <>
      <EventTargetSelector />
      {eventData.target_type == TargetType.IKKUNAT ? (
        <WindowBatch />
      ) : eventData.target_type == TargetType.KATTO ? (
        <EventRoofEditor />
      ) : eventData.target_type == TargetType.VIEMÄRIPUTKET ? (
        <SewerPipeEditor
          sewerPipeData={eventData}
          onChange={updatePayload}
        />
      ) : eventData.target_type == TargetType.SALAOJAT ? (
        <EventDrainageDitchEditor />
      ) : eventData.target_type == TargetType.KÄYTTÖVESIPUTKET ? (
        <WaterPipeEditor
          waterPipeData={payload}
          onChange={updatePayload}
        />
      ) : eventData.target_type == TargetType.ERISTYS ? (
        <InsulationEditor
          initialData={insulation}
          onChange={entries => resetInsulation(entries)}
        />
      ) : eventData.target_type == TargetType.SÄHKÖT ? (
        <ElectricalEditor
          selectedTargets={selectedERTargetIds}
          onChange={id => {
            toggleERTargetId(id);
          }}
        />
      ) : eventData.target_type == TargetType.LUKITUS ? (
        <LockBatch />
      ) : eventData.target_type == TargetType.LÄMMITYSMUOTO ? (
        <HeatingRenovationContent />
      ) : eventData.target_type == TargetType.ULKOVERHOUS ? (
        <ExteriorCladdingEditor
          value={payload}
          onChange={updatePayload}
        />
      ) : null}
    </>
  );
}
