import { Label, RadioGroupContainer } from '@/components/UI/FormUtils';
import { useAddComponentContext } from '../AddComponentProvider';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';

export const HeatingSystemContent = () => {
  const { refs } = useAddComponentContext();
  return (
    <>
      <RadioGroupContainer>
        <Label boldText>Järjestelmän tyyppi</Label>
        <RadioGroup groupName='heatingSystemId'>
          {refs.heatingSystemTypes.map(type => (
            <RadioButton
              required
              label={type.label}
              value={type.value}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>
    </>
  );
};
