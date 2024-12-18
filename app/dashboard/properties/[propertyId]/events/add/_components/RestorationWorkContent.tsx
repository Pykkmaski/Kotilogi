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

export function RestorationWorkContent() {
  const { eventData, refs, updateEventData } = useEventFormContext();
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
          insulationData={eventData}
          onChange={updateEventData}
        />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Sähköt') ? (
        <ElectricalEditor
          electricalData={eventData}
          onChange={updateEventData}
        />
      ) : eventData.target_id == getIdByLabel(refs.eventTargets, 'Lukitus') ? (
        <LockBatch />
      ) : null}
    </>
  );
}
