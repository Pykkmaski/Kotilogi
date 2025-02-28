import { EventType } from 'kotilogi-app/types/EventType';
import { useEventFormContext } from '../EventFormContext';
import { TargetType } from 'kotilogi-app/types/TargetType';

/**Returns a function that takes an Editor-component, and calls that with the correct props, or none, based on the event target and type. */
export function useInvokeEditor() {
  const {
    eventData: { target_type, event_type },
    updatePayload,
  } = useEventFormContext();
  let props = {
    onChange: updatePayload,
  } as any;

  switch (event_type) {
    case EventType.PERUSKORJAUS:
      props = {
        ...props,
        ...getRestorationEditorProps(target_type),
      };
      break;

    case EventType.HUOLTOTYÖ:
    case EventType.PINTAREMONTTI:
    default:
      props = null;
  }

  return (Editor: TODO) =>
    props !== null && Editor !== null ? <Editor {...props} /> : Editor !== null ? <Editor /> : null;
}

function getRestorationEditorProps(target_type: string) {
  const { payload, insulation, selectedERTargetIds, toggleERTargetId, resetInsulation } =
    useEventFormContext();
  let props: any = {};
  switch (target_type) {
    case TargetType.VIEMÄRIPUTKET:
      props.sewerPipeData = payload;
      break;

    case TargetType.KÄYTTÖVESIPUTKET:
      props.waterPipeData = payload;
      break;

    case TargetType.ERISTYS:
      props.initialData = insulation;
      props.onChange = entries => resetInsulation(entries);
      break;

    case TargetType.SÄHKÖT:
      props.selectedTargets = selectedERTargetIds;
      props.onChange = id => {
        toggleERTargetId(id);
      };
      break;

    default:
      props = null;
  }

  return props;
}
