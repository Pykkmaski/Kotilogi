'use client';

import { ADeleteProperty } from '@/actions/properties';
import { FormBase } from '@/components/New/Forms/FormBase';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { FormStatus, useDataSubmissionForm } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type DeletePropertyFormProps = {
  property: HouseDataType | AppartmentDataType;
};

export function DeletePropertyForm({ property }: DeletePropertyFormProps) {
  const { data, updateData } = useInputData({} as { password: string });
  const [status, setStatus] = useState(FormStatus.IDLE);

  const router = useRouter();

  return (
    <FormBase
      onChange={updateData}
      onSubmit={async e => {
        e.preventDefault();
        setStatus(FormStatus.LOADING);
        await ADeleteProperty(property.id, data.password)
          .then(res => {
            if (res == -1) {
              toast.error('Annettu salasana on väärä!');
            } else {
              toast.success('Talo poistettu!');
              router.replace('/newDashboard/properties');
            }
            setStatus(FormStatus.IDLE);
          })
          .catch(err => {
            toast.error(err.message);
            setStatus(FormStatus.ERROR);
          });
      }}>
      <MainHeading>Poista talo</MainHeading>
      <p className='text-lg'>
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
      <div className='flex w-full justify-end gap-4'>
        <Button
          variant='text'
          type='button'
          disabled={status == FormStatus.LOADING}
          onClick={e => router.back()}>
          Peruuta
        </Button>

        <Button
          variant='contained'
          type='submit'
          disabled={status == FormStatus.LOADING}
          startIcon={<Delete />}>
          Poista
        </Button>
      </div>
    </FormBase>
  );
}
