import { FormControl, Input, Label, RadioGroupContainer } from '@/components/UI/FormUtils';
import { useAddComponentContext } from '../AddComponentProvider';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';

export const YardContent = () => {
  const { refs } = useAddComponentContext();
  return (
    <>
      <RadioGroupContainer>
        <Label boldText>Tontin omistustyyppi</Label>
        <RadioGroup groupName='yardOwnershipTypeId'>
          {refs.yardOwnershipTypes.map(type => (
            <RadioButton
              required
              label={type.name}
              value={type.id}
            />
          ))}
        </RadioGroup>
      </RadioGroupContainer>

      <FormControl
        required
        boldLabelText
        label='Pinta-ala (m2)'
        control={
          <Input
            name='area'
            type='number'
            step={0.01}
            min={0}
            placeholder='Anna tontin pinta-ala...'
          />
        }
      />
    </>
  );
};
