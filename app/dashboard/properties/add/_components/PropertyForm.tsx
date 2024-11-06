'use client';

import { Check } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ExteriorField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/ExteriorField';
import { GeneralField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/GeneralField';
import { HeatingField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/HeatingField';
import { InteriorField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/InteriorField';
import { OtherInfoField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/OtherInfoField';
import { PropertyFormContext } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyFormContext';
import { TargetTypeField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/TargetTypeField';
import { YardField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/YardField';

import { PropertyDataType } from 'kotilogi-app/dataAccess/types';
import toast from 'react-hot-toast';
import { createPropertyAction } from './actions';
import { DialogControl } from '@/components/Util/DialogControl';
import { usePropertyForm } from './PropertyForm.hooks';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

import { VPDialog } from '@/components/UI/VPDialog';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { useMemo } from 'react';

enum FormStatus {
  IDLE = 0,
  LOADING,
  ERROR = -1,
  DONE = -2,
}

type PropertyFormProps<T extends PropertyDataType> = React.PropsWithChildren & {
  property?: T;
  refs: TODO;
};

export function PropertyForm<T extends PropertyDataType>({ property, refs }: PropertyFormProps<T>) {
  const {
    status,
    data,
    router,
    updateData,

    resetData,
    updatePropertyInfo,
    onSubmit,
    isValid,
  } = usePropertyForm(property as TODO, refs);

  const formId = 'submit-property-form';
  const loading = status === FormStatus.LOADING;
  const done = status === FormStatus.DONE;

  const submitDisabled = useMemo(() => {
    return (
      loading ||
      done ||
      (data.propertyTypeId == getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') &&
        (!(data as TODO).houseNumber || !(data as TODO).propertyNumber)) ||
      !(data as TODO).streetAddress ||
      !(data as TODO).zipCode
    );
  }, [
    loading,
    done,
    data.propertyTypeId,
    refs.propertyTypes,
    (data as TODO).propertyNumber,
    (data as TODO).streetAddress,
    (data as TODO).zipCode,
  ]);

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      onChange={e => {
        updateData(e);
      }}
      className='flex flex-col gap-4'>
      <PropertyFormContext.Provider
        value={{
          resetData,
          isValid,
          updatePropertyInfo,
          property: data,
          refs,
        }}>
        <TargetTypeField />
        <GeneralField hidePropertyIdentifier={property !== undefined} />
        <ExteriorField />
        <YardField />
        <InteriorField />
        <HeatingField />
        <OtherInfoField />
      </PropertyFormContext.Provider>
      <RenderOnCondition condition={!property}>
        <div className='flex flex-row w-full items-center justify-end gap-4'>
          <Button
            color='secondary'
            onClick={e => router.back()}
            type='button'
            variant='text'
            disabled={status == FormStatus.LOADING || status == FormStatus.DONE}>
            Peruuta
          </Button>

          <ToggleProvider>
            <ToggleProvider.Trigger setAsAnchorForMUI>
              <Button
                color='secondary'
                type='button'
                variant='contained'
                disabled={submitDisabled}
                startIcon={<Check />}>
                {property ? 'Päivitä' : 'Vahvista'}
              </Button>
            </ToggleProvider.Trigger>

            <ToggleProvider.MUITarget>
              <VPDialog>
                <DialogTitle>Vahvista talo</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Olet lisäämässä taloa osoitteessa{' '}
                    {`${(data as PropertyDataType).streetAddress} ${
                      (data as TODO).houseNumber || ''
                    }`}
                    . Oletko varma?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <ToggleProvider.Trigger>
                    <Button
                      color='secondary'
                      variant='text'
                      type='button'>
                      Peruuta
                    </Button>
                  </ToggleProvider.Trigger>

                  <Button
                    form={formId}
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={status == FormStatus.LOADING || status == FormStatus.DONE}
                    startIcon={<Check />}>
                    {property ? 'Päivitä' : 'Vahvista'}
                  </Button>
                </DialogActions>
              </VPDialog>
            </ToggleProvider.MUITarget>
          </ToggleProvider>
        </div>
      </RenderOnCondition>
    </form>
  );
}
