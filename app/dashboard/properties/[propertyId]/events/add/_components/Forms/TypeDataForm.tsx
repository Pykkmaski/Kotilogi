import { useEventFormContext } from '../EventFormContext';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventTargetSelector } from '../Selectors/EventTargetSelector';
import { EventTypeSelector } from '../Selectors/EventTypeSelector';
import { EventWorkSelector } from '../Selectors/EventServiceWorkSelector';
import { isDefined } from '../util';
import { useEventTypeContext } from '../EventTypeProvider';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export function TypeDataForm() {
  const { eventData } = useEventFormContext();
  const { refs } = useEventTypeContext();

  const showWorkTypeSelector = () => {
    return (
      isDefined(eventData.event_type_id) &&
      isDefined(eventData.target_id) &&
      eventData.event_type_id != getIdByLabel(refs.eventTypes, 'Peruskorjaus') &&
      eventData.event_type_id != getIdByLabel(refs.eventTypes, 'Pintaremontti') &&
      eventData.event_type_id != getIdByLabel(refs.eventTypes, 'Muu')
    );
  };

  return (
    <>
      <Fieldset legend='Osastojen valinta'>
        <FormControl
          boldLabelText
          required
          label='Osasto'
          control={<EventTypeSelector />}
        />

        <RenderOnCondition condition={isDefined(eventData.event_type_id)}>
          <EventTargetSelector />
        </RenderOnCondition>

        <RenderOnCondition condition={showWorkTypeSelector()}>
          <EventWorkSelector />
        </RenderOnCondition>
      </Fieldset>
    </>
  );
}
