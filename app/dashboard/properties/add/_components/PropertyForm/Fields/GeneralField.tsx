'use client';

import { BoxFieldset, Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input, SubLabel } from '@/components/UI/FormUtils';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';

import { usePropertyFormContext } from '../../PropertyFormContext';
import { useEffect, useState } from 'react';
import { fetchPropertyInfoAction } from 'kotilogi-app/app/dashboard/properties/add/_components/actions';
import { isPropertyIdentifier } from 'kotilogi-app/utils/isPropertyIdentifier';
import { Check, Clear } from '@mui/icons-material';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { OptionSelector } from '../../../../../../../components/Feature/OptionSelector';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { Spacer } from '@/components/UI/Spacer';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export function GeneralField({ hidePropertyIdentifier }) {
  const {
    property: data,
    refs,

    updatePropertyInfo,
    isValid,
  } = usePropertyFormContext();

  useEffect(() => {
    if (hidePropertyIdentifier) {
      return;
    }

    const timeout = setTimeout(async () => {
      const isValidPattern = isPropertyIdentifier((data as HousePayloadType).propertyNumber);

      if (isValidPattern) {
        fetchPropertyInfoAction((data as any).propertyNumber).then(result => {
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
    data && data.propertyTypeId == getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name');

  const getAddressDescription = () => {
    return isHouse ? 'Täytetään automaattisesti...' : 'Kirjoita talon osoite...';
  };
  const getZipCodeDescription = () => {
    return isHouse ? 'Täytetään automaattisesti...' : 'Kirjoita postinumero...';
  };
  console.log(data.build_year);

  return (
    <BoxFieldset legend='Yleistiedot'>
      <div className='flex flex-col gap-4 w-full'>
        {!hidePropertyIdentifier && isHouse && (
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
                defaultValue={data && (data as HousePayloadType).propertyNumber}
              />
            }
          />
        )}

        <FormControl
          label='Osoite'
          helper={<SubLabel>Osoite täytetään kiinteistötunnuksen perusteella</SubLabel>}
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

        <FormControl
          label='Postinumero'
          required
          helper={<SubLabel>Postinumero täytetään kiinteistötunnuksen perusteella</SubLabel>}
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

        <RenderOnCondition condition={isHouse}>
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
        </RenderOnCondition>

        <FormControl
          label='Rakennusvuosi'
          control={
            <Input
              name='build_year'
              type='number'
              defaultValue={data && data.build_year}
              placeholder='Anna rakennusvuosi...'
              data-testid='build-year-input'
            />
          }
        />

        <RenderOnCondition condition={!isHouse}>
          <FormControl
            label='Huoneiston numero'
            required
            control={
              <Input
                defaultValue={data && (data as AppartmentPayloadType).houseNumber}
                data-testid='appartment-number-input'
                type='number'
                name='residence_number'
                min='0'
                step='1'
                placeholder='Anna huoneiston numero...'
              />
            }
          />
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

        <FormControl
          label='Rakennuksen tyyppi'
          control={
            <ChipRadioGroup
              name='building_type_id'
              dataArray={refs.buildingTypes}
              labelKey='name'
              valueKey='id'
              currentValue={data.building_type_id}
            />
          }
        />

        <FormControl
          label='Energialuokka'
          control={
            <ChipRadioGroup
              name='energyClassId'
              dataArray={refs.energyClasses}
              labelKey='name'
              valueKey='id'
              currentValue={data.energyClassId}
            />
          }
        />
      </div>
    </BoxFieldset>
  );
}
