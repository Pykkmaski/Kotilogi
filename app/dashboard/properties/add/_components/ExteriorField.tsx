'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';

export function ExteriorField() {
  const { property, roofTypes, roofMaterials, buildingMaterials, mainColors } =
    usePropertyFormContext();

  return (
    <Fieldset legend='Ulkopuoli'>
      <div className='flex lg:flex-row xs:flex-col w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Rakennusmateriaali</Label>
          <RadioGroup groupName='buildingMaterialId'>
            {buildingMaterials.map(({ name, id }) => {
              return (
                <RadioButton
                  data-testid={`building-material-radio-${id}`}
                  label={name}
                  type='radio'
                  value={id}
                  defaultChecked={id == property.buildingMaterialId}
                />
              );
            })}
          </RadioGroup>
        </div>

        <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
          <Label boldText>Väri</Label>
          <div className='grid grid-flow-row gap-4 grid-cols-2'>
            <RadioGroup groupName='mainColorId'>
              {mainColors.map(({ name, id }) => {
                return (
                  <RadioButton
                    data-testid={`main-color-radio-${id}`}
                    label={name}
                    value={id}
                    type='radio'
                    defaultChecked={id == property.mainColorId}
                  />
                );
              })}
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className='flex flex-row w-full mt-8'>
        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Katon tyyppi</Label>

          <RadioGroup groupName='roofTypeId'>
            {roofTypes.map(({ name, id }) => {
              return (
                <RadioButton
                  data-testid={`roof-type-radio-${id}`}
                  label={name}
                  value={id}
                  type='radio'
                  defaultChecked={id == property.roofTypeId}
                />
              );
            })}
          </RadioGroup>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Katon materiaali</Label>

          <RadioGroup groupName='roofMaterialId'>
            {roofMaterials.map(({ name, id }) => (
              <RadioButton
                data-testid={`roof-material-radio-${id}`}
                label={name}
                value={id}
                type='radio'
                defaultChecked={id == property.roofMaterialId}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </Fieldset>
  );
}
