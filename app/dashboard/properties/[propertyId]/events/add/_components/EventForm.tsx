'use client';

import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider } from './EventFormContext';
import { useEventForm } from './hooks/useEventForm';
import { MainDataForm } from './Forms/MainDataForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { TabButton } from '@/components/UI/TabButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';
import { EventTypeSelector } from './Selectors/EventTypeSelector';
import { BoxFieldset } from '@/components/UI/Fieldset';
import { Notification } from '@/components/UI/Notification';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

import { Check } from '@mui/icons-material';
import { RestorationWorkContent } from './RestorationWorkContent';
import { ServiceWorkContent } from './ServiceWorkContent';
import { getServiceWorkTypes } from './actions';
import { useQuery } from '@tanstack/react-query/build/legacy';
import Spinner from '@/components/UI/Spinner';
import { OtherWorkContent } from './OtherWorkContent';
import { SurfaceWorkContent } from './SurfaceWorkContent';
import { FieldsetContainer } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm';
import { EventDataContent } from './EventDataContent';
import { FormNav } from './FormNav';
import { EventTargetContent } from './EventTargetContent';

const CarouselHeader = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-4 items-center'>
        <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
          <TabButton>Tyyppi</TabButton>
        </CarouselProvider.SelectSlotTrigger>

        <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
          <TabButton>Kohteen tiedot</TabButton>
        </CarouselProvider.SelectSlotTrigger>

        <CarouselProvider.SelectSlotTrigger slotToSelect='data'>
          <TabButton>Muut tiedot</TabButton>
        </CarouselProvider.SelectSlotTrigger>
      </div>
    </div>
  );
};

type EventFormProps = {
  propertyId: string;
  initialEventData?: EventPayloadType & Required<Pick<EventPayloadType, 'id'>>;
  initialExtraData?: any;
};

export function EventForm({ propertyId, initialEventData, initialExtraData }: EventFormProps) {
  const eventFormProps = useEventForm(propertyId, initialEventData, initialExtraData);
  const router = useRouter();
  const pathname = usePathname();

  const { editing, onSubmit } = eventFormProps;

  const tab = useSearchParams().get('t') || 'type';
  const updateSlot = (slotName: string) => {
    router.replace(`${pathname}?t=${slotName}`);
  };

  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={onSubmit}>
      <EventFormProvider
        {...eventFormProps}
        editing={editing}
        propertyId={propertyId}>
        <div className='flex flex-col gap-4'>
          <SecondaryHeading>
            {initialEventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}
          </SecondaryHeading>
          <CarouselProvider
            defaultSlot={tab}
            onChange={updateSlot}>
            <CarouselHeader />
            <CarouselProvider.Slot slotName='type'>
              <BoxFieldset legend='Valitse tapahtuman tyyppi'>
                <FieldsetContainer>
                  <CarouselProvider.NextTrigger>
                    <EventTypeSelector />
                  </CarouselProvider.NextTrigger>

                  <FormNav />
                </FieldsetContainer>
              </BoxFieldset>
            </CarouselProvider.Slot>

            <CarouselProvider.Slot slotName='target'>
              <EventTargetContent />
            </CarouselProvider.Slot>

            <CarouselProvider.Slot slotName='data'>
              <EventDataContent />
            </CarouselProvider.Slot>
          </CarouselProvider>
        </div>
      </EventFormProvider>
    </form>
  );
}
