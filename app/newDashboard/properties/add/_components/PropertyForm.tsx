'use client';

import { ACreateProperty, AUpdateProperty } from '@/actions/properties';
import { FormBase } from '@/components/New/Forms/FormBase';
import { useDataSubmissionForm } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ExteriorField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/ExteriorField';
import { GeneralField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/GeneralField';
import { HeatingField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/HeatingField';
import { InteriorField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/InteriorField';
import { OtherInfoField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/OtherInfoField';
import { PropertyFormContext } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/PropertyForm';
import { TargetTypeField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/TargetTypeField';
import { YardField } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/properties/_components/NewAddPropertyModal/Form/YardField';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

enum FormStatus {
  IDLE = 0,
  LOADING,
  ERROR = -1,
}

type PropertyFormProps<T extends PropertyDataType> = {
  property?: T;
};

export function PropertyForm<T extends PropertyDataType>({ property }: PropertyFormProps<T>) {
  const { data, updateData, status, onSubmit } = useDataSubmissionForm(
    AUpdateProperty,
    ACreateProperty,
    property
  );

  const router = useRouter();

  useEffect(() => {
    //Update the server-side data automatically if editing an existing property.
    if (!property) return;
    const timeout = setTimeout(async () => {
      AUpdateProperty(data).catch(err => toast.error(err.message));
    }, 600);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <form
      onSubmit={onSubmit}
      onChange={updateData}
      className='flex flex-col gap-4'>
      <PropertyFormContext.Provider value={{ property: data }}>
        {!property ? <TargetTypeField /> : null}

        <GeneralField />
        <ExteriorField />
        <YardField />
        <InteriorField />
        <HeatingField />
        <OtherInfoField />
      </PropertyFormContext.Provider>
      {!property ? (
        <div className='flex flex-row w-full items-center justify-end gap-4'>
          <Button
            onClick={e => router.back()}
            type='button'
            variant='text'
            disabled={status == FormStatus.LOADING}>
            Peruuta
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={status == FormStatus.LOADING}
            startIcon={<Check />}>
            {property ? 'Päivitä' : 'Vahvista'}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
