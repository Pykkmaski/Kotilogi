import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { buildingMaterials, colors, roofMaterials, roofTypes } from 'kotilogi-app/constants';

export function ExteriorField() {
  return (
    <Fieldset legend='Ulkopuoli'>
      <div className='flex lg:flex-row xs:flex-col w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Rakennusmateriaali</Label>
          <RadioGroup groupName='buildingMaterial'>
            {buildingMaterials.map(type => (
              <input
                type='radio'
                value={type}
              />
            ))}
          </RadioGroup>
        </div>

        <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
          <Label boldText>Väri</Label>
          <div className='grid grid-flow-row gap-4 grid-cols-2'>
            <RadioGroup groupName='color'>
              {colors.map(color => (
                <input
                  value={color}
                  type='radio'
                />
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className='flex flex-row w-full mt-8'>
        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Katon tyyppi</Label>

          <RadioGroup groupName='roofType'>
            {roofTypes.map(type => (
              <input
                value={type}
                type='radio'
              />
            ))}
          </RadioGroup>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <Label boldText>Katon materiaali</Label>

          <RadioGroup groupName='roofMaterial'>
            {roofMaterials.map(mat => (
              <input
                value={mat}
                type='radio'
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </Fieldset>
  );
}
