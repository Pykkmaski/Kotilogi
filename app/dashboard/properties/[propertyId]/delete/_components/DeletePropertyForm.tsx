'use client';

import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';
import { deletePropertyAction } from './actions';
import { BoxFieldset } from '@/components/UI/Fieldset';

type DeletePropertyFormProps = {
  property: HousePayloadType | AppartmentPayloadType;
};

export function DeletePropertyForm({ property }: DeletePropertyFormProps) {
  return (
    <BoxFieldset legend='Poista talo'>
      <div className='flex flex-col gap-4 w-full'>
        <ObjectDeletionForm
          returnUrl='/dashboard'
          objectId={property.id}
          deleteMethod={async credentials =>
            deletePropertyAction(property.id, credentials.password)
          }>
          <p className='text-lg mb-4'>
            Olet poistamassa taloa{' '}
            <strong className='font-semibold'>
              {property.street_name} {property.street_number}.
            </strong>
            <br />
            Sinun on annettava nykyinen salasanasi, että talo voidaan poistaa.
            <br />
            Poiston yhteydessä menetät kaikki taloon liittyvät tapahtuma- ja kulutustiedot, sekä
            kuvat ja tiedostot.
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
      </div>
    </BoxFieldset>
  );
}
