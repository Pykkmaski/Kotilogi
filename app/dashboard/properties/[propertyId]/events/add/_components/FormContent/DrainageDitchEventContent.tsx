import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../EventTypeProvider';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';

export const DrainageDitchEventContent = () => {
  const { refs } = useEventTypeContext();
  return (
    <>
      <div className='flex flex-col gap-2'>
        <Label boldText>Materiaali</Label>
        <RadioGroup name='roofMaterialId'>
          {refs.roofMaterials.map(type => (
            <RadioButton
              required
              label={type.name}
              value={type.id}
            />
          ))}
        </RadioGroup>
      </div>

      <div className='flex flex-col gap-2'>
        <Label boldText>Tyyppi</Label>
        <RadioGroup name='roofTypeId'>
          {refs.roofTypes.map(type => (
            <RadioButton
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
