import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

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
