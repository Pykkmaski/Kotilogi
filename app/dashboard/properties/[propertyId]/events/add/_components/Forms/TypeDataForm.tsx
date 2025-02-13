import { useEventFormContext } from '../EventFormContext';
import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventTargetSelector } from '../Selectors/EventTargetSelector';
import { EventTypeSelector } from '../Selectors/EventTypeSelector';
import { EventServiceWorkSelector } from '../Selectors/EventServiceWorkSelector';
import { isDefined } from '../util';
import { useEventTypeContext } from '../EventTypeProvider';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { EventType } from 'kotilogi-app/types/EventType';

export function TypeDataForm() {
  const { eventData } = useEventFormContext();
  const { refs } = useEventTypeContext();

  const showWorkTypeSelector = () => {
    return (
      isDefined(eventData.event_type) &&
      isDefined(eventData.target_type) &&
      eventData.event_type != EventType.PERUSKORJAUS &&
      eventData.event_type != EventType.PINTAREMONTTI &&
      eventData.event_type != EventType.MUU
    );
  };

  return (
    <>
      <BoxFieldset legend='Osastojen valinta'>
        <div className='flex flex-col gap-4'>
          <FormControl
            boldLabelText
            required
            label='Osasto'
            control={<EventTypeSelector />}
          />

          <RenderOnCondition condition={isDefined(eventData.event_type)}>
            <EventTargetSelector />
          </RenderOnCondition>

          <RenderOnCondition condition={showWorkTypeSelector()}>
            <EventServiceWorkSelector />
          </RenderOnCondition>
        </div>
      </BoxFieldset>
    </>
  );
}
