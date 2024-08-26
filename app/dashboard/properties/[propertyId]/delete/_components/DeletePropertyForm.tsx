'use client';

import { ADeleteProperty } from '@/actions/properties';
import { FormBase } from '@/components/New/Forms/FormBase';
import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { FormStatus, useDataSubmissionForm } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type DeletePropertyFormProps = {
  property: HouseDataType | AppartmentDataType;
};

export function DeletePropertyForm({ property }: DeletePropertyFormProps) {
  return (
    <ObjectDeletionForm
      returnUrl='/dashboard'
      objectId={property.id}
      deleteMethod={async credentials =>
        await axios.delete(`/api/protected/properties?id=${property.id}`, {
          headers: {
            Authorization: `Password ${credentials.password}`,
          },
        })
      }>
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
