'use client';

import { Check } from '@mui/icons-material';
import {
  Button,
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
import { YardField } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/Fields/YardField';

import { PropertyPayloadType } from 'kotilogi-app/dataAccess/types';
import { usePropertyForm } from './PropertyForm.hooks';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

import { VPDialog } from '@/components/UI/VPDialog';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { useMemo } from 'react';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { TabButton } from '@/components/UI/TabButton';
import { PropertyOverview } from './PropertyOverview';
import { usePathname, useSearchParams } from 'next/navigation';

type PropertyFormProps<T extends PropertyPayloadType> = React.PropsWithChildren & {
  property?: T;
  refs: TODO;
};

export function PropertyForm<T extends PropertyPayloadType>({
  property,
  refs,
}: PropertyFormProps<T>) {
  const propertyFormProps = usePropertyForm(property as TODO, refs);

  const { status, data, onSubmit, updateData, isNew, router } = propertyFormProps;
  const currentSlot = useSearchParams().get('t') || 'general';
  const pathname = usePathname();

  const formId = 'submit-property-form';
  const loading = status === 'loading';
  const done = status === 'done';

  const updateSlot = (slotName: string) => {
    router.replace(`${pathname}?t=${slotName}`);
  };

  const submitDisabled = useMemo(() => {
    return (
      loading ||
      done ||
      (data.property_type_id == getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') &&
        (!(data as TODO).houseNumber || !(data as TODO).propertyNumber)) ||
      !(data as TODO).street_name ||
      !(data as TODO).zip_code
    );
  }, [
    loading,
    done,
    data.property_type_id,
    refs.propertyTypes,
    (data as TODO).propertyNumber,
    (data as TODO).street_name,
    (data as TODO).zip_code,
  ]);

  console.log(currentSlot);
  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className='flex flex-col gap-4'>
      <PropertyFormContext.Provider
        value={{
          ...propertyFormProps,
          property: data,
          refs,
        }}>
        <CarouselProvider
          defaultSlot={currentSlot}
          onChange={updateSlot}>
          <div className='flex justify-between'>
            <div className='items-center gap-4 lg:flex xs:hidden'>
              <CarouselProvider.SelectSlotTrigger slotToSelect='general'>
                <TabButton>Yleistiedot</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='exterior'>
                <TabButton>Ulkopuoli</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='interior'>
                <TabButton>Sisäpuoli</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='yard'>
                <TabButton>Tontti</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='heating'>
                <TabButton>Lämmitys</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='other'>
                <TabButton>Muut tiedot</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='draft'>
                <TabButton>Yhteenveto</TabButton>
              </CarouselProvider.SelectSlotTrigger>
            </div>

            <div className='flex gap-1'>
              <CarouselProvider.PreviousTrigger>
                <Button color='secondary'>Edellinen</Button>
              </CarouselProvider.PreviousTrigger>
              <CarouselProvider.NextTrigger>
                <Button color='secondary'>Seuraava</Button>
              </CarouselProvider.NextTrigger>
            </div>

            <div className='lg:hidden xs:block'>
              (<CarouselProvider.SlotNumbers />)
            </div>
          </div>

          <CarouselProvider.Slot slotName='general'>
            <GeneralField hidePropertyIdentifier={!isNew} />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='exterior'>
            <ExteriorField />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='interior'>
            <InteriorField />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='yard'>
            <YardField />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='heating'>
            <HeatingField />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='other'>
            <OtherInfoField />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='draft'>
            <div className='flex flex-col gap-2'>
              <PropertyOverview />
              <RenderOnCondition condition={!property}>
                <div className='flex flex-row w-full items-center justify-end gap-4'>
                  <Button
                    color='secondary'
                    onClick={e => router.back()}
                    type='button'
                    variant='text'
                    disabled={loading || done}>
                    Peruuta
                  </Button>

                  <ToggleProvider>
                    <ToggleProvider.Trigger setAsAnchorForMUI>
                      <Button
                        color='secondary'
                        type='button'
                        variant='contained'
                        disabled={false}
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
                            {`${(data as PropertyPayloadType).street_name} ${
                              (data as TODO).street_number || ''
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
                            disabled={loading || done}
                            startIcon={<Check />}>
                            {property ? 'Päivitä' : 'Vahvista'}
                          </Button>
                        </DialogActions>
                      </VPDialog>
                    </ToggleProvider.MUITarget>
                  </ToggleProvider>
                </div>
              </RenderOnCondition>
            </div>
          </CarouselProvider.Slot>
        </CarouselProvider>
      </PropertyFormContext.Provider>
    </form>
  );
}
