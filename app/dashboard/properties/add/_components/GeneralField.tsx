'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input, Label } from '@/components/UI/FormUtils';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';

import { usePropertyFormContext } from './PropertyFormContext';
import { useEffect, useState } from 'react';
import { fetchPropertyInfo } from 'kotilogi-app/app/dashboard/properties/add/_components/actions';
import { isPropertyIdentifier } from 'kotilogi-app/utils/isPropertyIdentifier';
import { Check, Clear } from '@mui/icons-material';
import { primary } from 'kotilogi-app/colors';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

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
    if (hidePropertyIdentifier) {
      return;
    }

    const timeout = setTimeout(async () => {
      const isValidPattern = isPropertyIdentifier((data as HouseDataType).propertyNumber);

      if (isValidPattern) {
        fetchPropertyInfo((data as any).propertyNumber).then(result => {
          updatePropertyInfo(result, result !== null);
        });
      } else {
        //Reset the previous streetAddress and zipCode values.
        updatePropertyInfo(
          {
            streetAddress: '',
            zipCode: '',
          },
          false
        );
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [(data as any).propertyNumber]);

  const isHouse =
    data && data.propertyTypeId == propertyTypes.find(type => type.name === 'Kiinteistö').id;

  const getAddressDescription = () => {
    return isHouse ? 'Täytetään automaattisesti...' : 'Kirjoita talon osoite...';
  };
  const getZipCodeDescription = () => {
    return isHouse ? 'Täytetään automaattisesti...' : 'Kirjoita postinumero...';
  };

  return (
    <Fieldset legend='Yleistiedot'>
      {!hidePropertyIdentifier && isHouse && (
        <div className='w-full'>
          <FormControl
            label='Kiinteistötunnus'
            required
            control={
              <Input
                data-testid='property-number-input'
                icon={
                  <RenderOnCondition
                    condition={
                      (data as any).propertyNumber && (data as TODO).propertyNumber.length > 0
                    }>
                    <RenderOnCondition
                      condition={isValid}
                      fallback={<Clear sx={{ color: 'red' }} />}>
                      <Check sx={{ color: 'lime' }} />
                    </RenderOnCondition>
                  </RenderOnCondition>
                }
                name='propertyNumber'
                placeholder='Kirjoita kiinteistötunnus...'
                defaultValue={data && (data as HouseDataType).propertyNumber}
              />
            }
          />
        </div>
      )}

      <div className='flex lg:flex-row xs:flex-col gap-2 w-full'>
        <div className='w-full'>
          <FormControl
            label='Osoite'
            required
            control={
              <Input
                data-testid='street-address-input'
                name='streetAddress'
                disabled={isHouse}
                placeholder={getAddressDescription()}
                defaultValue={data && data.streetAddress}
                value={data && data.streetAddress}
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
                disabled={isHouse}
                defaultValue={(data && data.zipCode) || null}
                value={data.zipCode}
                name='zipCode'
                placeholder={getZipCodeDescription()}
                maxLength={5}></Input>
            }
          />
        </div>
        <RenderOnCondition condition={isHouse}>
          <div className='w-full'>
            <FormControl
              label='Talon numero'
              required
              control={
                <Input
                  data-testid='house-number-input'
                  name='houseNumber'
                  value={data && data.houseNumber}
                  defaultValue={data && data.houseNumber}
                  placeholder='Kirjoita talon numero...'
                  type='number'
                  step='1'
                  min='1'
                />
              }
            />
          </div>
        </RenderOnCondition>
      </div>

      <FormControl
        label='Rakennusvuosi'
        control={
          <Input
            name='buildYear'
            type='number'
            defaultValue={data && data.buildYear}
            placeholder='Anna rakennusvuosi...'
            data-testid='build-year-input'
          />
        }
      />

      <RenderOnCondition condition={!isHouse}>
        <div className='w-full'>
          <FormControl
            label='Huoneiston numero'
            control={
              <Input
                defaultValue={data && (data as AppartmentDataType).appartmentNumber}
                data-testid='appartment-number-input'
                type='number'
                name='appartmentNumber'
                min='0'
                step='1'
                placeholder='Anna huoneiston numero...'
              />
            }
          />
        </div>
      </RenderOnCondition>

      <FormControl
        label='Kuvaus'
        control={
          <Input
            data-testid='description-input'
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
              <FormControl
                label='Talotyyppi'
                control={
                  <ChipRadioGroup
                    dataArray={buildingTypes}
                    labelKey='name'
                    valueKey='id'
                    currentValue={data.buildingTypeId}
                    name='buildingTypeId'
                  />
                }
              />
            </div>
          </div>

          <div className='flex flex-col lg:w-[35%] xs:w-full gap-4 mt-8'>
            <FormControl
              label='Energialuokka'
              control={
                <ChipRadioGroup
                  dataArray={energyClasses}
                  labelKey='name'
                  valueKey='id'
                  currentValue={data.energyClassId}
                  name='energyClassId'
                />
              }
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
}
