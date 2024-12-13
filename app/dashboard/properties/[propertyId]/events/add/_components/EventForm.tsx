'use client';

import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider } from './EventFormContext';
import { useEventForm } from './hooks/useEventForm';
import { TypeDataForm } from './Forms/TypeDataForm';
import { MainDataForm } from './Forms/MainDataForm';
import { ExtraDataForm } from './Forms/ExtraDataForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { TabButton } from '@/components/UI/TabButton';
import { useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
  initialExtraData?: any;
};

export function EventForm({ propertyId, eventData, initialExtraData }: EventFormProps) {
  const eventFormProps = useEventForm(propertyId, eventData, initialExtraData);
  const { editing, showMainDataForm, showExtraDataForm } = eventFormProps;
  const tab = useSearchParams().get('t') || 'event_type';

  return (
    <EventFormProvider
      {...eventFormProps}
      propertyId={propertyId}>
      <div className='md:w-[70%] xs:w-full flex flex-col gap-4'>
        <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
        <CarouselProvider defaultSlot={tab}>
          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <CarouselProvider.SelectSlotTrigger slotToSelect='event_type'>
                <TabButton>Tyyppi</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='data'>
                <TabButton>Tiedot</TabButton>
              </CarouselProvider.SelectSlotTrigger>
            </div>

            <div className='flex gap-4'>
              <CarouselProvider.PreviousTrigger>
                <Button
                  color='secondary'
                  variant='text'>
                  Edellinen
                </Button>
              </CarouselProvider.PreviousTrigger>

              <CarouselProvider.NextTrigger>
                <Button
                  color='secondary'
                  variant='text'>
                  Seuraava
                </Button>
              </CarouselProvider.NextTrigger>
            </div>
          </div>

          <CarouselProvider.Slot slotName='event_type'>
            <TypeDataForm />
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='data'>
            <RenderOnCondition condition={showExtraDataForm()}>
              <ExtraDataForm editing={eventData} />
            </RenderOnCondition>

            <RenderOnCondition condition={showMainDataForm()}>
              <MainDataForm editing={eventData} />
            </RenderOnCondition>
          </CarouselProvider.Slot>
        </CarouselProvider>
      </div>
    </EventFormProvider>
  );
}
