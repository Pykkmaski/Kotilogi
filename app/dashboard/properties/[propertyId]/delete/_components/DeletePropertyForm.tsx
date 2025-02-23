'use client';

import { FormControl, Input } from '@/components/UI/FormUtils';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';
import { deletePropertyAction } from './actions';
import { BoxFieldset } from '@/components/UI/BoxFieldset';
import toast from 'react-hot-toast';
import { PropertyError, UserError } from 'kotilogi-app/utils/error';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { FormButtons } from '@/components/New/Forms/FormBase';

type DeletePropertyFormProps = {
  property: HousePayloadType | AppartmentPayloadType;
};

export function DeletePropertyForm({ property }: DeletePropertyFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const { data: credentials, updateData: updateCredentials } = useFormOnChangeObject({
    password: '',
  });

  const deleteProperty = async (e: any) => {
    e.preventDefault();
    let currentStatus: typeof status = 'loading';
    setStatus(currentStatus);
    try {
      const result = await deletePropertyAction(property.id, credentials.password);
      if (result === UserError.INVALID_PASSWORD) {
        toast.error('Salasana on virheellinen!');
        currentStatus = 'error';
      } else if (result === UserError.NOT_OWNER) {
        toast.error('Taloa ei voi poistaa, sillä et ole sen omistaja!');
        currentStatus = 'error';
      } else if (result === PropertyError.OPEN_TRANSFERS) {
        toast.error('Taloa ei voi poistaa, sillä se odottaa siirtoa toiselle käyttäjälle.');
        currentStatus = 'error';
      } else {
        toast.success('Talo poistettu!');
        router.replace('/dashboard/properties');
        currentStatus = 'done';
      }
    } catch (err) {
      toast.error('Talon poisto epäonnistui tuntemattomasta syystä!');
      currentStatus = 'error';
    } finally {
      setStatus(currentStatus);
    }
  };

  return (
    <BoxFieldset legend='Poista talo'>
      <div className='flex flex-col gap-4 w-full'>
        <form onSubmit={deleteProperty}>
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
                onChange={updateCredentials}
                value={credentials.password}
              />
            }
          />
          <FormButtons
            loading={status === 'loading'}
            done={status === 'done'}
            submitDisabled={credentials.password.length === 0}
            backAction={() => router.back()}
          />
        </form>
      </div>
    </BoxFieldset>
  );
}
