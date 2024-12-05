import { Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';

export function MaterialExpensesInput() {
  const { eventData, updateEventData } = useEventFormContext();
  return (
    <Input
      onChange={updateEventData}
      name='material_expenses'
      type='number'
      defaultValue={0}
      value={eventData && eventData.material_expenses}
      placeholder='Anna kulujen materiaaliosuus...'
      step={0.01}
      min={0}></Input>
  );
}
