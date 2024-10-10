import { Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../../EventTypeProvider';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useEventFormContext } from '../../EventFormContext';

export const RoofMaterialSelector = () => {
  const { refs } = useEventTypeContext();
  const { extraData } = useEventFormContext();

  return (
    <div className='flex flex-col gap-2'>
      <Label
        boldText
        required>
        Materiaali
      </Label>
      <RadioGroup name='roofMaterialId'>
        {refs.roofMaterials.map(type => (
          <ChipButton
            required
            label={type.name}
            value={type.id}
            checked={extraData && extraData.roofMaterialId == type.id}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
