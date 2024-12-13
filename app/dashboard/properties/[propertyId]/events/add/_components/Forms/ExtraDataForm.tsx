import { BoxFieldset, Fieldset } from '@/components/UI/Fieldset';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { HeatingRenovationContent } from '../FormContent/HeatingRenovationContent/HeatingRenovationContent';
import { WindowRenovationContent } from '../FormContent/WindowRenovationEvent/WindowRenovationContent';
import { RoofEventContent } from '../FormContent/RoofEventContent/RoofEventContent';
import { DrainageDitchEventContent } from '../FormContent/DrainageDitchEventContent/DrainageDitchEventContent';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { LockEventContent } from '../FormContent/LockEventContent/LockEventContent';
import { ElectricityEventContent } from '../FormContent/ElectricityEventContent/ElectricityEventContent';
import { KayttoVesiEventContent } from '../FormContent/KayttovesiEventContent/KayttovesiEventContent';
import { EristeEventContent } from '../FormContent/EristeEventContent/EristeEventContent';
import { ViemariPutketEventContent } from '../FormContent/ViemariPutketEventContent/ViemariPutketEventContent';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

/**Collects the additional data related to some types of events. */
export function ExtraDataForm({ editing }) {
  const { updateExtraData, eventData, extraData, addEntry } = useEventFormContext();
  const { refs } = useEventTypeContext();

  const getContent = () => {
    const { target_id } = eventData;

    var content = null;
    if (target_id == getIdByLabel(refs.eventTargets, 'Ikkunat')) {
      content = <WindowRenovationContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Lämmitysmuoto')) {
      content = <HeatingRenovationContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Katto')) {
      content = <RoofEventContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Salaojat')) {
      content = <DrainageDitchEventContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Lukitus')) {
      content = <LockEventContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Sähköt')) {
      content = <ElectricityEventContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Käyttövesiputket')) {
      content = <KayttoVesiEventContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Viemäriputket')) {
      content = <ViemariPutketEventContent />;
    } else if (target_id == getIdByLabel(refs.eventTargets, 'Eristys')) {
      content = <EristeEventContent />;
    } else {
      console.error(
        'Additional content not implemented for target type with id ' + eventData.target_id
      );
    }

    return (content && <>{content}</>) || null;
  };

  const displaySubmitButton = () => {
    if (eventData.target_id == getIdByLabel(refs.eventTargets, 'Ikkunat')) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form
      id='extraDataForm'
      className='flex flex-col gap-4'
      onChange={updateExtraData}
      onSubmit={e => {
        //Add an entry to the batch.
        e.preventDefault();
        addEntry(extraData);
      }}>
      {getContent()}
      {displaySubmitButton() && (
        <div className='flex justify-end w-full'>
          <Button
            type='submit'
            variant='text'
            color='secondary'
            startIcon={<Add />}
            onClick={() => addEntry(extraData)}>
            Lisää Toinen
          </Button>
        </div>
      )}
    </form>
  );
}
