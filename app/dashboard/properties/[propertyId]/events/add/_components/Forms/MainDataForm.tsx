import { Spacer } from '@/components/New/Spacer';
import { useEventFormContext } from '../EventFormContext';
import { SharedEventDataInputs } from '../SharedEventDataInputs';
import { Button } from '@/components/New/Button';
import { isDefined } from '../util';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventTypeContext } from '../EventTypeProvider';

export function MainDataForm({ editing }) {
  const {
    updateMainData,
    mainData,
    cancel,
    onSubmit,
    typeData,
    status,
    selectedSurfaceIds,
    setShowConfirmationDialog,
  } = useEventFormContext();
  const { refs } = useEventTypeContext();

  const isSubmitDisabled = () => {
    var state;
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      state = !isDefined(typeData.targetId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainTypeId, 'Huoltotyö')) {
      state = !isDefined(typeData.targetId) || !isDefined(typeData.workTypeId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainTypeId, 'Pintaremontti')) {
      state = !isDefined(typeData.targetId) || selectedSurfaceIds.length == 0;
    } else {
      state = true;
    }

    return state && status != 'idle';
  };

  return (
    <form
      id='mainDataForm'
      onSubmit={onSubmit}
      onChange={updateMainData}
      className='flex flex-col gap-4'>
      <SharedEventDataInputs isEditing={editing} />

      <Spacer
        direction='row'
        gap={4}
        width='full'
        justifyItems='end'>
        <Button
          color='secondary'
          variant='text'
          onClick={cancel}>
          Peruuta
        </Button>

        <Button
          variant='contained'
          onClick={() => setShowConfirmationDialog(true)}
          color='secondary'
          disabled={isSubmitDisabled()}>
          {(editing && 'Päivitä') || 'Vahvista'}
        </Button>
      </Spacer>
    </form>
  );
}
