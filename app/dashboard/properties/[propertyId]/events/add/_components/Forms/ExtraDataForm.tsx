import { Fieldset } from '@/components/UI/Fieldset';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { HeatingRenovationContent } from '../FormContent/HeatingRenovationContent/HeatingRenovationContent';
import { WindowRenovationContent } from '../FormContent/WindowRenovationContent';
import { RoofEventContent } from '../FormContent/RoofEventContent/RoofEventContent';
import { DrainageDitchEventContent } from '../FormContent/DrainageDitchEventContent/DrainageDitchEventContent';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

export function ExtraDataForm({ editing }) {
  const { updateExtraData, extraData, typeData } = useEventFormContext();
  const { refs } = useEventTypeContext();

  const getContent = () => {
    const { targetId } = typeData;

    var content = null;
    if (targetId == getIdByLabel(refs.eventTargets, 'Ikkunat')) {
      content = <WindowRenovationContent />;
    } else if (targetId == getIdByLabel(refs.eventTargets, 'Lämmitysmuoto')) {
      content = <HeatingRenovationContent />;
    } else if (targetId == getIdByLabel(refs.eventTargets, 'Katto')) {
      content = <RoofEventContent />;
    } else if (targetId == getIdByLabel(refs.eventTargets, 'Salaojat')) {
      content = <DrainageDitchEventContent />;
    } else {
      console.error(
        'Additional content not implemented for target type with id ' + typeData.targetId
      );
    }

    return (content && <Fieldset legend='Tiedot'>{content}</Fieldset>) || null;
  };

  return (
    <form
      id='extraDataForm'
      className='flex flex-col gap-4'
      onChange={updateExtraData}>
      {getContent()}
    </form>
  );
}
