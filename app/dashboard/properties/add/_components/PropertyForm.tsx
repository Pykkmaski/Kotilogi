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
import { ExteriorField } from 'kotilogi-app/app/dashboard/properties/add/_components/ExteriorField';
import { GeneralField } from 'kotilogi-app/app/dashboard/properties/add/_components/GeneralField';
import { HeatingField } from 'kotilogi-app/app/dashboard/properties/add/_components/HeatingField';
import { InteriorField } from 'kotilogi-app/app/dashboard/properties/add/_components/InteriorField';
import { OtherInfoField } from 'kotilogi-app/app/dashboard/properties/add/_components/OtherInfoField';
import { PropertyFormContext } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyFormContext';
import { TargetTypeField } from 'kotilogi-app/app/dashboard/properties/add/_components/TargetTypeField';
import { YardField } from 'kotilogi-app/app/dashboard/properties/add/_components/YardField';

import { PropertyDataType } from 'kotilogi-app/dataAccess/types';
import toast from 'react-hot-toast';
import { createPropertyAction } from './actions';
import { DialogControl } from '@/components/Util/DialogControl';
import { usePropertyForm } from './PropertyForm.hooks';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { VPDialog } from '@/components/UI/VPDialog';

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
            onClick={e => router.back()}
            type='button'
            variant='text'
            disabled={status == FormStatus.LOADING || status == FormStatus.DONE}>
            Peruuta
          </Button>

          <VisibilityProvider>
            <VisibilityProvider.Trigger setAsAnchorForMUI>
              <Button
                type='button'
                variant='contained'
                disabled={submitDisabled}
                startIcon={<Check />}>
                {property ? 'Päivitä' : 'Vahvista'}
              </Button>
            </VisibilityProvider.Trigger>

            <VisibilityProvider.Target>
              <VPDialog>
                <DialogTitle>Vahvista talo</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Olet lisäämässä taloa osoitteessa{' '}
                    {`${(data as PropertyDataType).streetAddress} ${(data as TODO).houseNumber}`}.
                    Oletko varma?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <VisibilityProvider.Trigger>
                    <Button
                      variant='text'
                      type='button'>
                      Peruuta
                    </Button>
                  </VisibilityProvider.Trigger>

                  <Button
                    form={formId}
                    type='submit'
                    variant='contained'
                    disabled={status == FormStatus.LOADING || status == FormStatus.DONE}
                    startIcon={<Check />}>
                    {property ? 'Päivitä' : 'Vahvista'}
                  </Button>
                </DialogActions>
              </VPDialog>
            </VisibilityProvider.Target>
          </VisibilityProvider>
        </div>
      </RenderOnCondition>
    </form>
  );
}
