'use client';

import { ACreateProperty, AUpdateProperty } from '@/actions/properties';
import { FormBase } from '@/components/New/Forms/FormBase';
import { useDataSubmissionForm } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { ExteriorField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/ExteriorField';
import { GeneralField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/GeneralField';
import { HeatingField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/HeatingField';
import { InteriorField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/InteriorField';
import { OtherInfoField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/OtherInfoField';
import { PropertyFormContext } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/PropertyForm';
import { TargetTypeField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/TargetTypeField';
import { YardField } from 'kotilogi-app/app/newDashboard/_components/NewAddPropertyModal/Form/YardField';

import { PropertyDataType } from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

enum FormStatus {
  IDLE = 0,
  LOADING,
  ERROR = -1,
  DONE = -2,
}

type PropertyFormProps<T extends PropertyDataType> = React.PropsWithChildren & {
  property?: T;
  propertyTypes: TODO;
  energyClasses: TODO;
  buildingTypes: TODO;
  buildingMaterials: TODO;
  roofTypes: TODO;
  roofMaterials: TODO;
  yardOwnershipTypes: TODO;
  heatingTypes: TODO;
  mainColors: TODO;
};

export function PropertyForm<T extends PropertyDataType>({
  property,
  propertyTypes,
  energyClasses,
  buildingTypes,
  buildingMaterials,
  roofTypes,
  roofMaterials,
  yardOwnershipTypes,
  heatingTypes,
  mainColors,
}: PropertyFormProps<T>) {
  const [hasChanges, setHasChanges] = useState(false);
  const { data, updateData } = useInputData(property || {});
  const [status, setStatus] = useState(FormStatus.IDLE);

  const router = useRouter();

  const runUpdate = async () =>
    await axios
      .patch('/api/protected/properties', {
        id: property.id,
        data,
      })
      .then(res => {
        if (res.status == 200) {
          toast.success(res.statusText);
        } else {
          toast.error(res.statusText);
        }
      })
      .catch(err => toast.error(err.message));

  const onSubmit = async e => {
    e.preventDefault();
    setStatus(FormStatus.LOADING);
    if (property) {
      await runUpdate();
    } else {
      await axios.post('/api/protected/properties', {
        data,
      });
    }
    setStatus(FormStatus.IDLE);
  };

  useEffect(() => {
    //Update the server-side data automatically if editing an existing property.
    if (!property || !hasChanges) return;

    const timeout = setTimeout(async () => {
      const loadingToast = toast.loading('Päivitetään tietoja...');
      await runUpdate().finally(() => toast.dismiss(loadingToast));
    }, 900);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <form
      onSubmit={onSubmit}
      onChange={e => {
        updateData(e);
        setHasChanges(true);
      }}
      className='flex flex-col gap-4'>
      <PropertyFormContext.Provider
        value={{
          property: data,
          propertyTypes,
          energyClasses,
          buildingTypes,
          buildingMaterials,
          roofTypes,
          roofMaterials,
          yardOwnershipTypes,
          heatingTypes,
          mainColors,
        }}>
        {!property && <TargetTypeField />}
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
            disabled={status == FormStatus.LOADING || status == FormStatus.DONE}>
            Peruuta
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={status == FormStatus.LOADING || status == FormStatus.DONE}
            startIcon={<Check />}>
            {property ? 'Päivitä' : 'Vahvista'}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
