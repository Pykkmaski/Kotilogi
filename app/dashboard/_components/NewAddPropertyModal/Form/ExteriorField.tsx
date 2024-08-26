'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';

export function ExteriorField() {
  const { property, roofTypes, roofMaterials, buildingMaterials, mainColors } =
    usePropertyFormContext();

  return (
    <Fieldset legend='Ulkopuoli'>
      <div className='flex lg:flex-row xs:flex-col w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Rakennusmateriaali</Label>
          <RadioGroup groupName='buildingMaterialId'>
            {Object.entries(buildingMaterials).map(([name, id]: [string, number]) => {
              return (
                <RadioButton
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
              {Object.entries(mainColors).map(([name, id]: [string, number]) => {
                return (
                  <RadioButton
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
            {Object.entries(roofTypes).map(([name, id]: [string, number]) => {
              return (
                <RadioButton
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
            {Object.entries(roofMaterials).map(([name, id]: [string, number]) => (
              <RadioButton
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