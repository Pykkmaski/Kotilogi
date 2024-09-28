'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { AddComponentForm } from '@/components/New/AddComponentForm';
import { Label, RadioGroupContainer } from '@/components/UI/FormUtils';
import { SecondaryHeading } from '@/components/UI/Heading';
import { useInputData } from '@/hooks/useInputData';
import toast from 'react-hot-toast';
import { addRoofAction } from './actions';
import { Fieldset } from '@/components/UI/Fieldset';

export function AddRoofForm({ propertyId, roofTypes, roofMaterials }) {
  const { data, updateData } = useInputData({} as any);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await addRoofAction(propertyId, data);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <AddComponentForm
      onSubmit={onSubmit}
      onChange={updateData}>
      <SecondaryHeading>Lisää Katto</SecondaryHeading>
      <Fieldset legend='Tiedot'>
        <RadioGroupContainer>
          <Label>Katon tyyppi</Label>
          <RadioGroup groupName='roofTypeId'>
            {roofTypes.map(type => (
              <RadioButton
                label={type.name}
                value={type.value}
              />
            ))}
          </RadioGroup>
        </RadioGroupContainer>

        <RadioGroupContainer>
          <Label>Katon materiaali</Label>
          <RadioGroup groupName='roofMaterialId'>
            {roofMaterials.map(type => (
              <RadioButton
                label={type.name}
                value={type.value}
              />
            ))}
          </RadioGroup>
        </RadioGroupContainer>
      </Fieldset>
    </AddComponentForm>
  );
}
