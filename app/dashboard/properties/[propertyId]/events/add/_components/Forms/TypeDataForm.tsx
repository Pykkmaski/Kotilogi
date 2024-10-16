import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { useEventFormContext } from '../EventFormContext';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventTargetSelector } from '../Selectors/EventTargetSelector';
import { MainEventTypeSelector } from '../Selectors/MainEventTypeSelector';
import { EventWorkSelector } from '../Selectors/EventWorkSelector';
import { isDefined } from '../util';
import { useEventTypeContext } from '../EventTypeProvider';
import { SurfaceSelector } from '../Selectors/SurfaceSelector';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

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
      typeData.mainTypeId != getIdByLabel(refs.mainEventTypes, 'Pintaremontti')
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

        {isDefined(typeData.mainTypeId) && <EventTargetSelector />}
        {showWorkTypeSelector() && <EventWorkSelector />}
      </Fieldset>
    </form>
  );
}
