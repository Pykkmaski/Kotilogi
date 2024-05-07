import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label, SubLabel } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { colors, energyClasses } from 'kotilogi-app/constants';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { buildingMaterials, buildingTypes } from 'kotilogi-app/constants';

export function GeneralField() {
  const { obj: data } = useObjectProviderContext() as { obj: Kotidok.PropertyType };

  return (
    <Fieldset legend='Yleistiedot'>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex flex-row w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <Label required>
              <span className='font-semibold'>Kohdetyyppi</span>
            </Label>
            <RadioGroup groupName='targetType'>
              <input
                type='radio'
                value='Kiinteistö'
                onChange={e => {
                  const { checked } = e.target;
                  if (checked) {
                    //Clear the value of the appartmentNumber-property in the data.
                    delete data.appartmentNumber;
                  }
                }}
                defaultChecked={data.targetType === 'Kiinteistö'}
              />

              <input
                type='radio'
                value='Huoneisto'
                onChange={e => {
                  const { checked } = e.target;
                  if (checked) {
                    //Clear the propertyNumber-property in the data.
                    delete data.propertyNumber;
                  }
                }}
                defaultChecked={data.targetType === 'Huoneisto'}
              />
            </RadioGroup>
          </div>

          <div className='flex flex-col gap-4 w-full'>
            <Label required>
              <span className='font-semibold'>Talotyyppi</span>
            </Label>
            <div className='grid grid-flow-row grid-cols-2 gap-4'>
              <RadioGroup groupName='buildingType'>
                {buildingTypes.map(type => (
                  <input
                    required
                    type='radio'
                    value={type}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full gap-4 mt-8'>
          <Label>
            <span className='font-semibold'>Energialuokka</span>
          </Label>

          <RadioGroup groupName='energyClass'>
            {energyClasses.map(ec => (
              <input
                value={ec}
                type='radio'
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      {data.targetType === 'Kiinteistö' ? (
        <div className='w-full'>
          <Group>
            <Label required>Kiinteistötunnus</Label>
            <Input
              name='propertyNumber'
              required
              placeholder='Kirjoita kiinteistötunnus...'
              defaultValue={data.propertyNumber}
            />
          </Group>
        </div>
      ) : null}

      <div className='flex flex-row gap-2 w-full'>
        <div className='w-full'>
          <Group>
            <Label required>Osoite</Label>
            <Input
              name='title'
              placeholder='Kirjoita talon osoite...'
              defaultValue={data.title}
              required></Input>
          </Group>
        </div>

        <div className='w-full'>
          <Group>
            <Label required>Postinumero</Label>
            <Input
              name='zipCode'
              maxLength={5}
              placeholder='Kirjoita talon postinumero...'
              defaultValue={data.zipCode}
              required></Input>
          </Group>
        </div>
      </div>

      <Group>
        <label>Rakennusvuosi</label>
        <Input
          name='buildYear'
          type='number'
          placeholder='Anna rakennusvuosi...'
          defaultValue={data.buildYear}
        />
      </Group>

      {data.targetType === 'Huoneisto' ? (
        <div className='w-full'>
          <Group>
            <label>Huoneiston numero</label>
            <Input
              type='number'
              name='appartmentNumber'
              min='0'
              step='1'
              defaultValue={data.appartmentNumber}
              placeholder='Anna huoneiston numero...'
            />
          </Group>
        </div>
      ) : null}
    </Fieldset>
  );
}
