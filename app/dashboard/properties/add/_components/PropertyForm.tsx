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

import { PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createPropertyAction, updatePropertyAction } from './actions';
import { DialogControl } from '@/components/Util/DialogControl';

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
  const address = property && property.streetAddress.split(' ');

  let streetName;
  let houseNumber;
  if (address) {
    houseNumber = address.at(-1);
    //Remove the house number.
    address.splice(-1, 1);
    streetName = address.join(' ');
  }

  const { data, updateData, resetData } = useInputData(
    {
      ...property,
      streetAddress: streetName,
      houseNumber,
    } || {}
  );
  const [isValid, setIsValid] = useState(false);
  const [status, setStatus] = useState(FormStatus.IDLE);

  const router = useRouter();

  const updatePropertyInfo = (info: TODO) => {
    if (!info) {
      setIsValid(false);
      toast.error('Kiinteistötunnuksella ei löytynyt kohdetta!');
    } else {
      resetData({
        ...data,
        ...info,
      });
      setIsValid(true);
    }
  };

  useEffect(() => {
    //Update the server-side data automatically if editing an existing property.
    if (!property || !hasChanges) return;

    const timeout = setTimeout(async () => {
      const loadingToast = toast.loading('Päivitetään tietoja...');
      await updatePropertyAction(property.id, data as PropertyDataType)
        .catch(err => toast.error(err.message))
        .finally(() => toast.dismiss(loadingToast));
    }, 900);

    return () => clearTimeout(timeout);
  }, [data]);

  const formId = 'submit-property-form';

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
        setHasChanges(true);
      }}
      className='flex flex-col gap-4'>
      <PropertyFormContext.Provider
        value={{
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
                  disabled={status == FormStatus.LOADING || status == FormStatus.DONE}
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
