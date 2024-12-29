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
  const { status } = useEventFormContext();

  return (
    <div className='flex flex-col gap-2 w-full'>
      <SharedEventDataInputs isEditing={editing} />

      <Spacer
        dir='row'
        gap={'medium'}
        full
        justify='end'>
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
                  disabled={status == 'loading'}
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
        </ToggleProvider>
      </Spacer>
    </div>
  );
}
