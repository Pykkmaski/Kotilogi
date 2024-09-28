import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Label, RadioGroupContainer } from '@/components/UI/FormUtils';
import { useAddComponentContext } from '../AddComponentProvider';

export const ExteriorContent = () => {
  const { refs } = useAddComponentContext();
  return (
    <>
      <RadioGroupContainer>
        <Label boldText>Ulkopuolen pääväri</Label>
        <RadioGroup groupName='mainColorId'>
          {refs.mainColors.map(color => (
            <RadioButton
              value={color.id}
              label={color.name}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>

      <RadioGroupContainer>
        <Label boldText>Rakennusmateriaali</Label>
        <RadioGroup groupName='buildingMaterialId'>
          {refs.buildingMaterials.map(type => (
            <RadioButton
              value={type.id}
              label={type.name}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>

      <RadioGroupContainer>
        <Label boldText>Rakennustyyppi</Label>
        <RadioGroup groupName='buildingTypeId'>
          {refs.buildingTypes.map(type => (
            <RadioButton
              value={type.id}
              label={type.name}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>
    </>
  );
};
