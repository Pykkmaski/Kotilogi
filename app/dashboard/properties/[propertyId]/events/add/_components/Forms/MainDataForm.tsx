import { Spacer } from '@/components/New/Spacer';
import { useEventFormContext } from '../EventFormContext';
import { SharedEventDataInputs } from '../SharedEventDataInputs';
import { Button } from '@/components/New/Button';
import { isDefined } from '../util';

export function MainDataForm({ editing }) {
  const { updateMainData, mainData, cancel, onSubmit, typeData, status } = useEventFormContext();

  const submitDisabled =
    !isDefined(typeData.mainTypeId) ||
    !isDefined(typeData.targetId) ||
    !isDefined(typeData.workTypeId) ||
    status !== 'idle';

  return (
    <form
      id='mainDataForm'
      onSubmit={onSubmit}
      onChange={updateMainData}
      className='flex flex-col gap-4'>
      <SharedEventDataInputs />

      <Spacer
        direction='row'
        gap={4}
        width='full'
        justifyItems='end'>
        <Button
          variant='text'
          onClick={cancel}>
          Peruuta
        </Button>

        <Button
          variant='contained'
          type='submit'
          disabled={submitDisabled}>
          {(editing && 'Päivitä') || 'Vahvista'}
        </Button>
      </Spacer>
    </form>
  );
}
