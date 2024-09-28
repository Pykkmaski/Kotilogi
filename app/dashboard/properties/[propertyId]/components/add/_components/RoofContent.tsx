import { Label, RadioGroupContainer } from '@/components/UI/FormUtils';
import { useAddComponentContext } from '../AddComponentProvider';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';

export const RoofContent = () => {
  const { refs } = useAddComponentContext();
  return (
    <>
      <RadioGroupContainer>
        <Label boldText>Katon tyyppi</Label>
        <RadioGroup groupName='roofTypeId'>
          {refs.roofTypes.map(type => (
            <RadioButton
              required
              label={type.name}
              value={type.id}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>

      <RadioGroupContainer>
        <Label boldText>Katon materiaali</Label>
        <RadioGroup groupName='roofMaterialId'>
          {refs.roofMaterials.map(type => (
            <RadioButton
              required
              label={type.name}
              value={type.id}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>
    </>
  );
};
