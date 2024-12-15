'use client';

import { Check, Menu } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import Spinner from '@/components/UI/Spinner';
import { MenuPrefab, VPMenu } from '@/components/UI/VPMenu';
import { RoofField } from './PropertyForm/Fields/RoofField';

function GotoDraft({ updateSlot }) {
  return (
    <div
      className='flex w-full justify-end'
      onClick={() => updateSlot('draft')}>
      <CarouselProvider.SelectSlotTrigger slotToSelect='draft'>
        <Button color='secondary'>Siirry vahvistamaan</Button>
      </CarouselProvider.SelectSlotTrigger>
    </div>
  );
}

type PropertyFormProps<T extends PropertyPayloadType> = React.PropsWithChildren & {
  property?: T;
  refs: TODO;
};

export function PropertyForm<T extends PropertyPayloadType>({
  property,
  refs,
}: PropertyFormProps<T>) {
  const propertyFormProps = usePropertyForm(property as TODO, refs);

  const { status, data, onSubmit, updateData, isNew, router, isValid } = propertyFormProps;
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

              {data.property_type_id == getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') ? (
                <CarouselProvider.SelectSlotTrigger slotToSelect='roof'>
                  <TabButton>Katto</TabButton>
                </CarouselProvider.SelectSlotTrigger>
              ) : null}

              <CarouselProvider.SelectSlotTrigger slotToSelect='interior'>
                <TabButton>Sisäpuoli</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              {data.property_type_id ==
                refs.propertyTypes.find(t => t.name == 'Kiinteistö')?.id && (
                <CarouselProvider.SelectSlotTrigger slotToSelect='yard'>
                  <TabButton>Tontti</TabButton>
                </CarouselProvider.SelectSlotTrigger>
              )}

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

            <div className='lg:flex xs:hidden gap-1'>
              <CarouselProvider.PreviousTrigger>
                <Button color='secondary'>Edellinen</Button>
              </CarouselProvider.PreviousTrigger>
              <CarouselProvider.NextTrigger>
                <Button color='secondary'>Seuraava</Button>
              </CarouselProvider.NextTrigger>
            </div>

            <div className='xs:block lg:hidden'>
              <MenuPrefab
                trigger={
                  <IconButton>
                    <Menu />
                  </IconButton>
                }
                target={
                  <VPMenu>
                    <CarouselProvider.SelectSlotTrigger slotToSelect='general'>
                      <span>Yleistiedot</span>
                    </CarouselProvider.SelectSlotTrigger>

                    <CarouselProvider.SelectSlotTrigger slotToSelect='exterior'>
                      <span>Ulkopuoli</span>
                    </CarouselProvider.SelectSlotTrigger>
                    <CarouselProvider.SelectSlotTrigger slotToSelect='interior'>
                      <span>Sisäpuoli</span>
                    </CarouselProvider.SelectSlotTrigger>
                    {data.property_type_id ==
                      getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') && (
                      <CarouselProvider.SelectSlotTrigger slotToSelect='yard'>
                        <span>Tontti</span>
                      </CarouselProvider.SelectSlotTrigger>
                    )}
                    <CarouselProvider.SelectSlotTrigger slotToSelect='heating'>
                      <span>Lämmitys</span>
                    </CarouselProvider.SelectSlotTrigger>
                    <CarouselProvider.SelectSlotTrigger slotToSelect='other'>
                      <span>Muut tiedot</span>
                    </CarouselProvider.SelectSlotTrigger>
                    <CarouselProvider.SelectSlotTrigger slotToSelect='draft'>
                      <span>Yhteenveto</span>
                    </CarouselProvider.SelectSlotTrigger>
                  </VPMenu>
                }
              />
            </div>

            <div className='lg:hidden xs:block'>
              (<CarouselProvider.SlotNumbers />)
            </div>
          </div>

          <CarouselProvider.Slot slotName='general'>
            <GeneralField hidePropertyIdentifier={!isNew} />
            <GotoDraft updateSlot={updateSlot} />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='exterior'>
            <ExteriorField />
            <GotoDraft updateSlot={updateSlot} />
          </CarouselProvider.Slot>

          {data.property_type_id == getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') ? (
            <CarouselProvider.Slot slotName='roof'>
              <RoofField />
              <GotoDraft updateSlot={updateSlot} />
            </CarouselProvider.Slot>
          ) : null}

          <CarouselProvider.Slot slotName='interior'>
            <InteriorField />
            <GotoDraft updateSlot={updateSlot} />
          </CarouselProvider.Slot>

          {data.property_type_id == refs.propertyTypes.find(t => t.name == 'Kiinteistö')?.id && (
            <CarouselProvider.Slot slotName='yard'>
              <YardField />
              <GotoDraft updateSlot={updateSlot} />
            </CarouselProvider.Slot>
          )}

          <CarouselProvider.Slot slotName='heating'>
            <HeatingField />
            <GotoDraft updateSlot={updateSlot} />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='other'>
            <OtherInfoField />
            <GotoDraft updateSlot={updateSlot} />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='draft'>
            <div className='flex flex-col gap-2'>
              <PropertyOverview />

              <div className='flex flex-row w-full items-center justify-end gap-4'>
                <Button
                  color='secondary'
                  onClick={e => router.back()}
                  type='button'
                  variant='text'
                  disabled={loading || done}>
                  Peruuta
                </Button>

                <Button
                  color='secondary'
                  type='submit'
                  variant='contained'
                  disabled={!isValid || loading || done}
                  startIcon={loading ? <Spinner /> : <Check />}>
                  {property ? 'Päivitä' : 'Vahvista'}
                </Button>
              </div>
            </div>
          </CarouselProvider.Slot>
        </CarouselProvider>
      </PropertyFormContext.Provider>
    </form>
  );
}
