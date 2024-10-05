import { NullOption } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { useEffect } from 'react';

export const MainEventTypeSelector = () => {
  const {
    refs: { mainEventTypes },
  } = useEventTypeContext();
  const { typeData } = useEventFormContext();

  return (
    <RadioGroup name='mainTypeId'>
      {mainEventTypes.map((type, i) => (
        <ChipButton
          value={type.id}
          label={type.label}
          name='mainTypeId'
          checked={typeData.mainTypeId == type.id}
        />
      ))}
    </RadioGroup>
  );
};
