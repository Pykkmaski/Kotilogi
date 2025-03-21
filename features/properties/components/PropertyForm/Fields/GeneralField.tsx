'use client';

import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { FormControl, Input, SubLabel } from '@/components/UI/FormUtils';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';

import { usePropertyFormContext } from '../../PropertyFormContext';
import { useEffect, useState } from 'react';
import { isPropertyIdentifier } from 'kotilogi-app/utils/isPropertyIdentifier';
import { Check, Clear } from '@mui/icons-material';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import toast from 'react-hot-toast';
import Spinner from '@/components/UI/Spinner';
import { Notification } from '@/components/UI/Notification';
import { fetchPropertyInfoAction } from 'kotilogi-app/features/properties/actions/getPropertyInfoAction';

export function GeneralField({ hidePropertyIdentifier }) {
  const {
    property: data,
    refs,
    updateByKey,
    updateData,
    isValid,
    propertyIdentifierStatus,
    setPropertyIdentifierStatus,
    resetData,
  } = usePropertyFormContext();

  useEffect(() => {
    if (hidePropertyIdentifier) {
      return;
    }

    const timeout = setTimeout(async () => {
      const isValidPattern = isPropertyIdentifier((data as HousePayloadType).propertyNumber);

      if (isValidPattern) {
        setPropertyIdentifierStatus('loading');
        fetchPropertyInfoAction((data as any).propertyNumber)
          .then(result => {
            if (!result) {
              setPropertyIdentifierStatus('invalid');
            } else {
              resetData({
                ...data,
                ...(result as TODO),
              });
              setPropertyIdentifierStatus('valid');
            }
          })
          .finally(() => setPropertyIdentifierStatus(prev => (prev === 'loading' ? 'none' : prev)));
      } else {
        //Reset the previous street_name and zip_code values on an invalid pattern.
        resetData({
          ...(data as AppartmentPayloadType | HousePayloadType),
          street_name: '',
          zip_code: '',
        });
        setPropertyIdentifierStatus('none');
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [(data as any).propertyNumber]);

  const isHouse =
    data && data.property_type_id == getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name');

  const getAddressDescription = () => {
    return isHouse ? 'Täytetään automaattisesti...' : 'Kirjoita talon osoite...';
  };
  const getZipCodeDescription = () => {
    return isHouse ? 'Täytetään automaattisesti...' : 'Kirjoita postinumero...';
  };

  return (
    <div className='flex flex-col gap-4 w-full'>
      {!hidePropertyIdentifier && isHouse && (
        <FormControl
          label='Kiinteistötunnus'
          required
          helper={
            propertyIdentifierStatus == 'invalid' ? (
              <Notification
                variant='error'
                position='start'>
                Kiinteistötunnus on virheellinen!
              </Notification>
            ) : propertyIdentifierStatus == 'valid' ? (
              <Notification
                variant='success'
                position='start'>
                Kiinteistötunnus vahvistettu!
              </Notification>
            ) : null
          }
          control={
            <Input
              onChange={updateData}
              data-testid='property-number-input'
              icon={
                propertyIdentifierStatus === 'loading' ? (
                  <Spinner />
                ) : propertyIdentifierStatus === 'valid' ? (
                  <Check sx={{ color: 'green' }} />
                ) : propertyIdentifierStatus === 'invalid' ? (
                  <Clear sx={{ color: 'red' }} />
                ) : null
              }
              name='propertyNumber'
              placeholder='Kirjoita kiinteistötunnus...'
              defaultValue={data && (data as HousePayloadType).propertyNumber}
            />
          }
        />
      )}

      <FormControl
        label='Kadun nimi'
        helper={
          <SubLabel>
            Kadun nimi täytetään kiinteistötunnuksen perusteella. Jos tieto ei täsmää, ole hyvä ja
            korjaa se.
          </SubLabel>
        }
        required
        control={
          <Input
            data-testid='street-address-input'
            name='street_name'
            disabled={isHouse && !isValid}
            placeholder={getAddressDescription()}
            defaultValue={data && data.street_name}
            value={data && data.street_name}
            onChange={updateData}
          />
        }
      />

      <FormControl
        label='Postinumero'
        required
        helper={
          <SubLabel>
            Postinumero täytetään kiinteistötunnuksen perusteella. Jos tieto ei täsmää, ole hyvä ja
            korjaa se.
          </SubLabel>
        }
        control={
          <Input
            onChange={updateData}
            disabled={isHouse && !isValid}
            defaultValue={(data && data.zip_code) || null}
            value={data.zip_code}
            name='zip_code'
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
              onChange={updateData}
              data-testid='house-number-input'
              name='street_number'
              value={data && data.street_number}
              defaultValue={data && data.street_number}
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
            onChange={e => updateByKey('building', e)}
            name='build_year'
            type='number'
            defaultValue={data.building && data.building.build_year}
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
              onChange={updateData}
              defaultValue={data && (data as AppartmentPayloadType).street_number}
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
            onChange={updateData}
            data-testid='description-input'
            variant='textarea'
            spellCheck={false}
            name='description'
            placeholder='Anna vaihtoehtoinen kuvaus...'
            defaultValue={data && data.description}
          />
        }
      />
    </div>
  );
}
