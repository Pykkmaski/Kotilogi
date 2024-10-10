import { Label } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import { useEventTypeContext } from '../../EventTypeProvider';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

export const RoofTypeSelector = () => {
  const { extraData } = useEventFormContext();
  const { refs } = useEventTypeContext();

  return (
    <div className='flex flex-col gap-2'>
      <Label
        boldText
        required>
        Tyyppi
      </Label>
      <RadioGroup name='roofTypeId'>
        {refs.roofTypes.map(type => (
          <ChipButton
            required
            label={type.name}
            value={type.id}
            checked={extraData && extraData.roofTypeId == type.id}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
