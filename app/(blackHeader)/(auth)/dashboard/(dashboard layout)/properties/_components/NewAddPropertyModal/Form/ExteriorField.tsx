import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { getTranslation } from 'kotilogi-app/lang';
import { BuildingMaterial } from 'kotilogi-app/models/enums/BuildingMaterial';
import { Color } from 'kotilogi-app/models/enums/Color';
import { RoofType } from 'kotilogi-app/models/enums/RoofType';
import { RoofMaterial } from 'kotilogi-app/models/enums/RoofMaterial';

export function ExteriorField() {
  const { property } = usePropertyFormContext();

  return (
    <Fieldset legend='Ulkopuoli'>
      <div className='flex lg:flex-row xs:flex-col w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Rakennusmateriaali</Label>
          <RadioGroup groupName='buildingMaterial'>
            {getEnumAsDigits(BuildingMaterial).map(type => {
              const label = getTranslation('buildingMaterial', type);
              return (
                <RadioButton
                  label={label}
                  type='radio'
                  value={type}
                  defaultChecked={type == property.buildingMaterial}
                />
              );
            })}
          </RadioGroup>
        </div>

        <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
          <Label boldText>Väri</Label>
          <div className='grid grid-flow-row gap-4 grid-cols-2'>
            <RadioGroup groupName='color'>
              {getEnumAsDigits(Color).map(color => {
                const label = getTranslation('color', color);

                return (
                  <RadioButton
                    label={label}
                    value={color}
                    type='radio'
                    defaultChecked={color == property.color}
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

          <RadioGroup groupName='roofType'>
            {getEnumAsDigits(RoofType).map(type => {
              const label = getTranslation('roofType', type);
              return (
                <RadioButton
                  label={label}
                  value={type}
                  type='radio'
                  defaultChecked={type == property.roofType}
                />
              );
            })}
          </RadioGroup>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Katon materiaali</Label>

          <RadioGroup groupName='roofMaterial'>
            {getEnumAsDigits(RoofMaterial).map(mat => (
              <RadioButton
                label={getTranslation('roofMaterial', mat)}
                value={mat}
                type='radio'
                defaultChecked={mat == property.roofMaterial}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </Fieldset>
  );
}
