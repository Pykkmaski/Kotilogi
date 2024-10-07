import { Label, RadioGroupContainer } from '@/components/UI/FormUtils';
import { useAddComponentContext } from '../AddComponentProvider';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';

export const HeatingMethodContent = () => {
  const { refs } = useAddComponentContext();
  return (
    <>
      <RadioGroupContainer>
        <Label boldText>Lämmitysmenetelmän tyyppi</Label>
        <RadioGroup groupName='heatingMethodTypeId'>
          {refs.heatingCircuitTypes.map(({ label, id }) => (
            <RadioButton
              label={label}
              value={id}
              required
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>
    </>
  );
};
