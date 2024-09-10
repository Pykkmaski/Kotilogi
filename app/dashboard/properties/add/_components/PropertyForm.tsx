'use client';

import { useInputData } from '@/hooks/useInputData';
import { Check } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ExteriorField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/ExteriorField';
import { GeneralField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/GeneralField';
import { HeatingField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/HeatingField';
import { InteriorField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/InteriorField';
import { OtherInfoField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/OtherInfoField';
import { PropertyFormContext } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/PropertyForm';
import { TargetTypeField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/TargetTypeField';
import { YardField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/YardField';

import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createPropertyAction, updatePropertyAction } from './actions';
import { DialogControl } from '@/components/Util/DialogControl';
import { usePropertyForm } from './PropertyForm.hooks';

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
  const {
    status,
    data,
    router,
    updateData,
    updateChanges,
    resetData,
    updatePropertyInfo,
    isValid,
  } = usePropertyForm(property as TODO, propertyTypes);

  const formId = 'submit-property-form';
  const loading = status === FormStatus.LOADING;
  const done = status === FormStatus.DONE;
  const submitDisabled =
    loading ||
    done ||
    (data.propertyTypeId == propertyTypes['Kiinteistö'] &&
      (!(data as TODO).houseNumber || !(data as TODO).propertyNumber)) ||
    !(data as TODO).streetAddress ||
    !(data as TODO).zipCode;

  return (
    <form
      id={formId}
      onSubmit={async e => {
        e.preventDefault();
        try {
          await createPropertyAction(data as PropertyDataType);
          toast.success('Talo luotu!');
        } catch (err) {
          toast.error(err.message);
        }
      }}
      onChange={e => {
        updateData(e);
        updateChanges(true);
      }}
      className='flex flex-col gap-4'>
      <PropertyFormContext.Provider
        value={{
          resetData,
          isValid,
          updatePropertyInfo,
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
        <GeneralField hidePropertyIdentifier={property !== undefined} />
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

          <DialogControl
            trigger={({ onClick }) => {
              return (
                <Button
                  onClick={onClick}
                  type='button'
                  variant='contained'
                  disabled={submitDisabled}
                  startIcon={<Check />}>
                  {property ? 'Päivitä' : 'Vahvista'}
                </Button>
              );
            }}
            control={({ show, handleClose }) => {
              return (
                <Dialog
                  open={show}
                  onClose={handleClose}>
                  <DialogTitle>Vahvista talo</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Olet lisäämässä taloa osoitteessa{' '}
                      {`${(data as PropertyDataType).streetAddress} ${(data as TODO).houseNumber}`}.
                      Oletko varma?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant='text'
                      type='button'
                      onClick={handleClose}>
                      Peruuta
                    </Button>
                    <Button
                      form={formId}
                      type='submit'
                      variant='contained'
                      disabled={status == FormStatus.LOADING || status == FormStatus.DONE}
                      startIcon={<Check />}>
                      {property ? 'Päivitä' : 'Vahvista'}
                    </Button>
                  </DialogActions>
                </Dialog>
              );
            }}
          />
        </div>
      ) : null}
    </form>
  );
}
