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

export function RestorationWorkContent() {
  const {
    eventData,
    propertyId,
    refs,
    insulation,
    updateEventData,
    resetInsulation,
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
      eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Peruskorjaus') &&
      eventData.target_id == getIdByLabel(refs.eventTargets, 'Lämmitysmuoto'),
  });

  return (
    <>
      <EventTargetSelector />
      {eventData.target_id == getIdByLabel(refs.eventTargets, 'Ikkunat') ? (
        <WindowBatch />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Katto') ? (
        <EventRoofEditor />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Viemäriputket') ? (
        <SewerPipeEditor
          sewerPipeData={eventData}
          onChange={updateEventData}
        />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Salaojat') ? (
        <EventDrainageDitchEditor />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Käyttövesiputket') ? (
        <WaterPipeEditor
          waterPipeData={eventData}
          onChange={updateEventData}
        />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Eristys') ? (
        <InsulationEditor
          initialData={insulation}
          onChange={entries => resetInsulation(entries)}
        />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Sähköt') ? (
        <ElectricalEditor
          selectedTargets={selectedERTargetIds}
          onChange={id => {
            toggleERTargetId(id);
          }}
        />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Lukitus') ? (
        <LockBatch />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Lämmitysmuoto') ? (
        <HeatingRenovationContent />
      ) : null}
    </>
  );
}
