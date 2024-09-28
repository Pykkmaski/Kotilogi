import { NullOption } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
import { useEventTypeContext } from '../EventTypeProvider';

export const MainEventTypeSelector = () => {
  const {
    refs: { mainEventTypes },
  } = useEventTypeContext();
  const { event: data } = useEventContext();

  return (
    <select
      name='mainTypeId'
      required
      value={!data.mainTypeId ? 'null' : data.mainTypeId}>
      <NullOption>Valitse tapahtuman osasto...</NullOption>
      {mainEventTypes.map(type => (
        <option value={type.id}>{type.label}</option>
      ))}
    </select>
  );
};
