import { Spacer } from '@/components/New/Spacer';
import { useEventFormContext } from '../EventFormContext';
import { SharedEventDataInputs } from '../SharedEventDataInputs';
import { Button } from '@/components/New/Button';
import { isDefined } from '../util';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventTypeContext } from '../EventTypeProvider';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { VPDialog } from '@/components/UI/VPDialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Check } from '@mui/icons-material';
import Spinner from '@/components/UI/Spinner';

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
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Huoltotyö')) {
      state = !isDefined(typeData.targetId) || !isDefined(typeData.workTypeId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Pintaremontti')) {
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

        <VisibilityProvider>
          <VisibilityProvider.Target>
            <VPDialog>
              <DialogTitle>Vahvista tapahtuma</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Vahvistettuja tapahtumia ei voi muokata. Haluatko varmasti vahvistaa tapahtuman?
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <VisibilityProvider.Trigger>
                  <Button
                    disabled={status == 'loading' || status == 'done'}
                    variant='text'
                    color='secondary'>
                    Peruuta
                  </Button>
                </VisibilityProvider.Trigger>

                <Button
                  disabled={status == 'loading' || status == 'done'}
                  startIcon={
                    status == 'done' || status == 'idle' ? <Check /> : <Spinner size='1rem' />
                  }
                  variant='contained'
                  color='secondary'
                  type='submit'
                  form='mainDataForm'>
                  Vahvista
                </Button>
              </DialogActions>
            </VPDialog>
          </VisibilityProvider.Target>

          <VisibilityProvider.Trigger>
            <Button
              variant='contained'
              color='secondary'
              disabled={isSubmitDisabled()}>
              {(editing && 'Päivitä') || 'Vahvista'}
            </Button>
          </VisibilityProvider.Trigger>
        </VisibilityProvider>
      </Spacer>
    </form>
  );
}
