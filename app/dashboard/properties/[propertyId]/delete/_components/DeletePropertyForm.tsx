'use client';

import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';
import { deletePropertyAction } from './actions';

type DeletePropertyFormProps = {
  property: HousePayloadType | AppartmentPayloadType;
};

export function DeletePropertyForm({ property }: DeletePropertyFormProps) {
  return (
    <ObjectDeletionForm
      returnUrl='/dashboard'
      objectId={property.id}
      deleteMethod={async credentials => deletePropertyAction(property.id, credentials.password)}>
      <MainHeading>Poista talo</MainHeading>
      <p className='text-lg mb-4'>
        Olet poistamassa taloa{' '}
        <strong className='font-semibold'>
          {property.streetAddress} {'appartmentNumber' in property ? property.appartmentNumber : ''}
          .
        </strong>
        <br />
        Sinun on annettava nykyinen salasanasi, että talo voidaan poistaa.
        <br />
        Poiston yhteydessä menetät kaikki taloon liittyvät tapahtuma- ja kulutustiedot, sekä kuvat
        ja tiedostot.
        <br />
        <span className='text-red-700 font-semibold'>Poistoa ei voi kumota!</span>
      </p>
      <FormControl
        label='Salasana'
        required
        control={
          <Input
            type='password'
            name='password'
            autoComplete='new-password'
            placeholder='Kirjoita salasanasi...'
          />
        }
      />
    </ObjectDeletionForm>
  );
}
