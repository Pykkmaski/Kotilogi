import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../EventTypeProvider';

export const RoofEventContent = () => {
  const { refs } = useEventTypeContext();
  return (
    <>
      <div className='flex flex-col gap-2'>
        <Label boldText>Materiaali</Label>
        <RadioGroup groupName='roofMaterialId'>
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
        <RadioGroup groupName='roofTypeId'>
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
