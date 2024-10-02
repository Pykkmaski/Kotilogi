import { NullOption } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { useEffect } from 'react';

export const MainEventTypeSelector = () => {
  const {
    refs: { mainEventTypes },
  } = useEventTypeContext();
  const { event: data } = useEventContext();

  return (
    <RadioGroup name='mainTypeId'>
      {mainEventTypes.map((type, i) => (
        <ChipButton
          value={type.id}
          label={type.label}
          name='mainTypeId'
          checked={data.mainTypeId == type.id}
        />
      ))}
    </RadioGroup>
  );
};
