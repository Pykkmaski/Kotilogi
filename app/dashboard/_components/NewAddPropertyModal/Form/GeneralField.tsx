'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input, Label } from '@/components/UI/FormUtils';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';

import { usePropertyFormContext } from './PropertyForm';
import { useEffect } from 'react';
import { fetchPropertyInfo } from 'kotilogi-app/app/dashboard/properties/add/_components/actions';

export function GeneralField({ hidePropertyIdentifier }) {
  const {
    property: data,
    propertyTypes,
    buildingTypes,
    energyClasses,

    updatePropertyInfo,
    isValid,
  } = usePropertyFormContext();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      fetchPropertyInfo((data as any).propertyNumber).then(result => {
        updatePropertyInfo(result);
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [(data as any).propertyNumber]);

  return (
    <Fieldset legend='Yleistiedot'>
      {!hidePropertyIdentifier && data && data.propertyTypeId == propertyTypes['Kiinteistö'] ? (
        <div className='w-full'>
          <FormControl
            label='Kiinteistötunnus'
            required
            control={
              <Input
                name='propertyNumber'
                placeholder='Kirjoita kiinteistötunnus...'
                defaultValue={data && (data as HouseDataType).propertyNumber}
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
                disabled
                defaultValue={(data && data.streetAddress) || null}
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
                disabled
                defaultValue={(data && data.zipCode) || null}
                name='zipCode'
                maxLength={5}></Input>
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
            defaultValue={data && data.buildYear}
            placeholder='Anna rakennusvuosi...'
            data-testid='buildYear-input'
          />
        }
      />

      {data && data.propertyTypeId == propertyTypes['Huoneisto'] ? (
        <div className='w-full'>
          <FormControl
            label='Huoneiston numero'
            control={
              <Input
                defaultValue={data && (data as AppartmentDataType).appartmentNumber}
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
          <Input
            variant='textarea'
            spellCheck={false}
            name='description'
            placeholder='Anna vaihtoehtoinen kuvaus...'
            defaultValue={data && data.description}
          />
        }
      />
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
                <RadioGroup groupName='buildingTypeId'>
                  {Object.entries(buildingTypes).map(([name, id]: [string, number]) => {
                    return (
                      <RadioButton
                        label={name}
                        required
                        type='radio'
                        value={id}
                        defaultChecked={data && data.buildingTypeId == id}
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
              <RadioGroup groupName='energyClassId'>
                {Object.entries(energyClasses).map(([name, id]: [string, number]) => (
                  <RadioButton
                    label={name}
                    value={id}
                    type='radio'
                    defaultChecked={data && data.energyClassId == id}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </Fieldset>
  );
}
