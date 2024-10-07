import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

export const RoofEventContent = () => {
  const { refs } = useEventTypeContext();
  return (
    <>
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
            />
          ))}
        </RadioGroup>
      </div>

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
            />
          ))}
        </RadioGroup>
      </div>
    </>
  );
};
