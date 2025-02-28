import { EventType } from 'kotilogi-app/types/EventType';
import {
  getCosmeticTargetTypes,
  getRestorableTargetTypes,
  getServiceableTargetTypes,
  TargetType,
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
