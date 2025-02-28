import { Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';

export function LabourExpensesInput() {
  const { eventData, updateEventData } = useEventFormContext();
  return (
    <Input
      onChange={updateEventData}
      name='labour_expenses'
      type='number'
      defaultValue={0}
      value={eventData && eventData.labour_expenses}
      step={0.01}
      placeholder='Anna kulujen työosuus...'
      min={0}></Input>
  );
}
