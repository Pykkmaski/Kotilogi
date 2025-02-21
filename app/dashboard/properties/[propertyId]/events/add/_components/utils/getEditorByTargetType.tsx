import { DrainageDitchEditor } from '@/components/Feature/DrainageDitchEditor';
import { ExteriorCladdingEditor } from '@/components/Feature/ExteriorCladdingEditor';
import { RoofEditor } from '@/components/Feature/RoofEditor';
import { EventType, TargetType } from 'kotilogi-app/dataAccess/models/eventSchema';
import { HeatingRenovationContent } from '../FormContent/HeatingRenovationContent/HeatingRenovationContent';
import { LockBatch } from '../FormContent/LockBatch/LockBatch';
import { InsulationEditor } from '@/components/Feature/InsulationEditor';
import { WindowBatch } from '../FormContent/WindowBatch/WindowBatch';
import { SewerPipeEditor } from '@/components/Feature/SewerPipeEditor';
import { EventRoofEditor } from '../FormContent/EventRoofEditor';
import { EventDrainageDitchEditor } from '../FormContent/EventDrainageDitchEditor';
import { WaterPipeEditor } from '@/components/Feature/WaterPipeEditor';
import { ElectricalEditor } from '@/components/Feature/ElectricalEditor';
import { EventServiceWorkSelector } from '../Selectors/EventServiceWorkSelector';
import { SurfaceSelector } from '../Selectors/SurfaceSelector';

/**Returns the correct editor for a selected target, based on the selected event type. */
export function getEditorByEventType(target_type: string, event_type: string) {
  let Editor;
  switch (event_type) {
    case EventType.PERUSKORJAUS:
      Editor = getRestorationEditor(target_type);
      break;

    case EventType.HUOLTOTYÖ:
      Editor = getMaintenanceEditor(target_type);
      break;

    case EventType.PINTAREMONTTI:
      Editor = getCosmeticEditor(target_type);
      break;

    default:
      Editor = null;
  }

  return Editor;
}

/**Returns the restoration editor-component for the provided target type. */
function getRestorationEditor(target_type: string) {
  let Editor;
  switch (target_type) {
    case TargetType.KATTO:
      Editor = EventRoofEditor;
      break;

    case TargetType.SALAOJAT:
      Editor = EventDrainageDitchEditor;
      break;

    case TargetType.ULKOVERHOUS:
      Editor = ExteriorCladdingEditor;
      break;

    case TargetType.LÄMMITYSMUOTO:
      Editor = HeatingRenovationContent;
      break;

    case TargetType.LUKITUS:
      Editor = LockBatch;
      break;

    case TargetType.ERISTYS:
      Editor = InsulationEditor;
      break;

    case TargetType.IKKUNAT:
      Editor = WindowBatch;
      break;

    case TargetType.VIEMÄRIPUTKET:
      Editor = SewerPipeEditor;
      break;

    case TargetType.KÄYTTÖVESIPUTKET:
      Editor = WaterPipeEditor;
      break;

    case TargetType.SÄHKÖT:
      Editor = ElectricalEditor;
      break;

    default:
      Editor = null;
  }

  return Editor;
}

function getMaintenanceEditor(target_type: string) {
  return target_type !== undefined ? EventServiceWorkSelector : null;
}

function getCosmeticEditor(target_type: string) {
  return target_type !== undefined ? SurfaceSelector : null;
}
