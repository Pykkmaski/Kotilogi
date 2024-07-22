import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input, Label } from '@/components/UI/FormUtils';
import { energyClasses } from 'kotilogi-app/constants';
import { buildingTypes } from 'kotilogi-app/constants';
import { usePropertyFormContext } from './PropertyForm';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { BuildingType } from 'kotilogi-app/models/enums/BuildingType';
import { getTranslation, lang } from 'kotilogi-app/lang';

export function GeneralField() {
  const { property: data } = usePropertyFormContext();

  return (
    <Fieldset legend='Yleistiedot'>
      <div className='w-full flex gap-2'>
        <div className='flex flex-col gap-4 flex-1'>
          <div className='flex lg:flex-row xs:flex-col w-full'>
            <div className='flex flex-col gap-4 xs:w-full lg:w-[40%] xs:mt-8 lg:mt-0'>
              <Label
                required
                boldText>
                Talotyyppi
              </Label>
              <div className='grid grid-flow-row grid-cols-2 gap-4'>
                <RadioGroup groupName='buildingType'>
                  {getEnumAsDigits(BuildingType).map(type => {
                    const label = getTranslation('buildingType', type);

                    return (
                      <RadioButton
                        label={label}
                        data-testid={`${type}-input`}
                        required
                        type='radio'
                        value={type}
                        defaultChecked={data.buildingType == type}
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:w-[35%] xs:w-full gap-4 mt-8'>
            <Label boldText>Energialuokka</Label>

            <div className='grid grid-flow-row grid-cols-2 gap-4'>
              <RadioGroup groupName='energyClass'>
                {energyClasses.map(ec => (
                  <RadioButton
                    label={ec}
                    data-testid={`${ec}-input`}
                    value={ec}
                    type='radio'
                    defaultChecked={ec == data.energyClass}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {data.propertyType == PropertyType.HOUSE ? (
        <div className='w-full'>
          <FormControl
            label='Kiinteistötunnus'
            required
            control={
              <Input
                data-testid='propertyNumber-input'
                name='propertyNumber'
                placeholder='Kirjoita kiinteistötunnus...'
                defaultValue={data.propertyNumber}
              />
            }
          />
        </div>
      ) : null}

      <div className='flex flex-row gap-2 w-full'>
        <div className='w-full'>
          <FormControl
            label='Osoite'
            required
            control={
              <Input
                name='streetAddress'
                placeholder='Kirjoita talon osoite...'
                defaultValue={data.streetAddress}
              />
            }
          />
        </div>

        <div className='w-full'>
          <FormControl
            label='Postinumero'
            required
            control={
              <Input
                defaultValue={data.zipCode}
                name='zipCode'
                maxLength={5}
                placeholder='Kirjoita talon postinumero...'></Input>
            }
          />
        </div>
      </div>

      <FormControl
        label='Rakennusvuosi'
        control={
          <Input
            name='buildYear'
            type='number'
            defaultValue={data.buildYear}
            placeholder='Anna rakennusvuosi...'
            data-testid='buildYear-input'
          />
        }
      />

      {data.propertyType == PropertyType.APT ? (
        <div className='w-full'>
          <FormControl
            label='Huoneiston numero'
            control={
              <Input
                defaultValue={data.appartmentNumber}
                data-testid='appartmentNumber-input'
                type='number'
                name='appartmentNumber'
                min='0'
                step='1'
                placeholder='Anna huoneiston numero...'
              />
            }
          />
        </div>
      ) : null}

      <FormControl
        label='Kuvaus'
        control={
          <textarea
            spellCheck={false}
            name='description'
            placeholder='Anna vaihtoehtoinen kuvaus...'
            defaultValue={data.description}
          />
        }
      />
    </Fieldset>
  );
}
