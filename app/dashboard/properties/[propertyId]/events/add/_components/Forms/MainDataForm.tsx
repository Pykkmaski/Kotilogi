import { Spacer } from '@/components/UI/Spacer';
import { useEventFormContext } from '../EventFormContext';
import { SharedEventDataInputs } from '../SharedEventDataInputs';
import { Button } from '@/components/New/Button';
import { isDefined } from '../util';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useEventTypeContext } from '../EventTypeProvider';
import { VPDialog } from '@/components/UI/VPDialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Check } from '@mui/icons-material';
import Spinner from '@/components/UI/Spinner';
import { SurfaceSelector } from '../Selectors/SurfaceSelector';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Fieldset } from '@/components/UI/Fieldset';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { ToggleProvider } from '@/components/Util/ToggleProvider';

export function MainDataForm({ editing }) {
  const { updateMainData, mainData, cancel, onSubmit, typeData, status, selectedSurfaceIds } =
    useEventFormContext();
  const { refs } = useEventTypeContext();

  const isSubmitDisabled = () => {
    var state;
    if (typeData.mainTypeId == getIdByLabel(refs.eventTypes, 'Peruskorjaus')) {
      state = !isDefined(typeData.targetId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.eventTypes, 'Huoltotyö')) {
      state = !isDefined(typeData.targetId) || !isDefined(typeData.workTypeId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.eventTypes, 'Pintaremontti')) {
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
      <RenderOnCondition
        condition={typeData.mainTypeId == getIdByLabel(refs.eventTypes, 'Pintaremontti')}>
        <Fieldset legend='Pinnat'>
          <SurfaceSelector />
        </Fieldset>
      </RenderOnCondition>

      <SharedEventDataInputs isEditing={editing} />

      <Spacer
        dir='row'
        gap={'medium'}
        full
        justify='end'>
        <Button
          color='secondary'
          variant='text'
          onClick={cancel}>
          Peruuta
        </Button>

        <ToggleProvider>
          <ToggleProvider.Target>
            <VPDialog>
              <DialogTitle>Vahvista tapahtuma</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Vahvistettuja tapahtumia ei voi enää jälkikäteen muokata. Haluatko varmasti
                  vahvistaa tapahtuman?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <ToggleProvider.Trigger>
                  <Button
                    disabled={status == 'loading'}
                    variant='text'
                    color='secondary'>
                    Peruuta
                  </Button>
                </ToggleProvider.Trigger>

                <Button
                  disabled={status == 'loading' || status == 'done' || status === 'error'}
                  startIcon={
                    <RenderOnCondition
                      condition={status == 'idle' || status == 'done' || status === 'error'}
                      fallback={<Spinner />}>
                      <Check />
                    </RenderOnCondition>
                  }
                  variant='contained'
                  color='secondary'
                  type='submit'
                  form='mainDataForm'>
                  Vahvista
                </Button>
              </DialogActions>
            </VPDialog>
          </ToggleProvider.Target>

          <ToggleProvider.Trigger>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<Check />}
              disabled={isSubmitDisabled()}>
              <RenderOnCondition
                condition={editing}
                fallback='Vahvista'>
                Päivitä
              </RenderOnCondition>
            </Button>
          </ToggleProvider.Trigger>
        </ToggleProvider>
      </Spacer>
    </form>
  );
}
