import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { useEventFormContext } from '../EventFormContext';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventTargetSelector } from '../Selectors/EventTargetSelector';
import { MainEventTypeSelector } from '../Selectors/MainEventTypeSelector';
import { EventWorkSelector } from '../Selectors/EventWorkSelector';
import { isDefined } from '../util';
import { useEventTypeContext } from '../EventTypeProvider';

export function TypeDataForm({ editing }) {
  const { typeData, updateTypeData } = useEventFormContext();
  const { getIdByLabel, refs } = useEventTypeContext();

  return (
    <form
      className='flex flex-col gap-4'
      id='typeForm'
      onChange={updateTypeData}>
      <SecondaryHeading>{editing ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
      <Fieldset legend='Osastojen valinta'>
        <FormControl
          boldLabelText
          required
          label='Osasto'
          control={<MainEventTypeSelector />}
        />

        {isDefined(typeData.mainTypeId) && <EventTargetSelector />}
        {isDefined(typeData.mainTypeId) &&
          isDefined(typeData.targetId) &&
          typeData.mainTypeId != getIdByLabel(refs.mainEventTypes, 'Peruskorjaus') && (
            <EventWorkSelector />
          )}
      </Fieldset>
    </form>
  );
}
