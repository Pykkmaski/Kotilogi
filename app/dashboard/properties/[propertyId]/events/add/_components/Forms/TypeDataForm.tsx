import { useEventFormContext } from '../EventFormContext';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventTargetSelector } from '../Selectors/EventTargetSelector';
import { MainEventTypeSelector } from '../Selectors/MainEventTypeSelector';
import { EventWorkSelector } from '../Selectors/EventWorkSelector';
import { isDefined } from '../util';
import { useEventTypeContext } from '../EventTypeProvider';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export function TypeDataForm() {
  const { typeData, updateTypeData } = useEventFormContext();
  const { refs } = useEventTypeContext();

  const showSurfaceSelector = () => {
    return (
      isDefined(typeData.mainTypeId) &&
      isDefined(typeData.targetId) &&
      typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Pintaremontti')
    );
  };

  const showWorkTypeSelector = () => {
    return (
      isDefined(typeData.mainTypeId) &&
      isDefined(typeData.targetId) &&
      typeData.mainTypeId != getIdByLabel(refs.mainEventTypes, 'Peruskorjaus') &&
      typeData.mainTypeId != getIdByLabel(refs.mainEventTypes, 'Pintaremontti') &&
      typeData.mainTypeId != getIdByLabel(refs.mainEventTypes, 'Muu')
    );
  };

  return (
    <form
      className='flex flex-col gap-4'
      id='typeForm'
      onChange={updateTypeData}>
      <Fieldset legend='Osastojen valinta'>
        <FormControl
          boldLabelText
          required
          label='Osasto'
          control={<MainEventTypeSelector />}
        />

        <RenderOnCondition condition={isDefined(typeData.mainTypeId)}>
          <EventTargetSelector />
        </RenderOnCondition>

        <RenderOnCondition condition={showWorkTypeSelector()}>
          <EventWorkSelector />
        </RenderOnCondition>
      </Fieldset>
    </form>
  );
}
