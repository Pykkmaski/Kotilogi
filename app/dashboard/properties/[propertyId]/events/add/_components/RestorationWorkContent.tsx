import { useEventFormContext } from './EventFormContext';
import { WindowBatch } from './FormContent/WindowBatch/WindowBatch';
import { EventRoofEditor } from './FormContent/EventRoofEditor';
import { EventDrainageDitchEditor } from './FormContent/EventDrainageDitchEditor';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { SewerPipeEditor } from '@/components/Feature/SewerPipeEditor';
import { WaterPipeEditor } from '@/components/Feature/WaterPipeEditor';
import { InsulationEditor } from '@/components/Feature/InsulationEditor';
import { ElectricalEditor } from '@/components/Feature/ElectricalEditor';
import { LockBatch } from './FormContent/LockBatch/LockBatch';
import { HeatingRenovationContent } from './FormContent/HeatingRenovationContent/HeatingRenovationContent';
import { ExteriorCladdingEditor } from '@/components/Feature/ExteriorCladdingEditor';
import { TargetType } from 'kotilogi-app/types/TargetType';

export function RestorationWorkContent() {
  const {
    eventData,
    insulation,
    resetInsulation,
    updatePayload,
    payload,
    selectedERTargetIds,
    toggleERTargetId,
  } = useEventFormContext();

  return (
    <>
      <EventTargetSelector />
      {eventData.target_type == TargetType.IKKUNAT ? (
        <WindowBatch />
      ) : eventData.target_type == TargetType.KATTO ? (
        <EventRoofEditor />
      ) : eventData.target_type == TargetType.VIEMÄRIPUTKET ? (
        <SewerPipeEditor
          sewerPipeData={payload}
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
