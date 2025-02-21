import { EventType, TargetType } from 'kotilogi-app/dataAccess/models/eventSchema';
import {
  getCosmeticTargetTypes,
  getRestorableTargetTypes,
  getServiceableTargetTypes,
} from 'kotilogi-app/types/TargetType';

export function getTargetsByEventType(event_type: string) {
  let targets: string[] = [];
  switch (event_type) {
    case EventType.PERUSKORJAUS:
      targets = getRestorableTargetTypes();
      break;

    case EventType.HUOLTOTYÖ:
      targets = getServiceableTargetTypes();
      break;

    case EventType.PINTAREMONTTI:
      targets = getCosmeticTargetTypes();
      break;

    default:
      targets = Object.values(TargetType);
  }

  return targets;
}
