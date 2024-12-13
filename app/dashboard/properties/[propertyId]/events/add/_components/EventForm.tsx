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
import { EventTypeSelector } from './Selectors/EventTypeSelector';
import { BoxFieldset } from '@/components/UI/Fieldset';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { Notification } from '@/components/UI/Notification';

type EventFormProps = {
  propertyId: string;
  initialEventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
  initialExtraData?: any;
};

export function EventForm({ propertyId, initialEventData, initialExtraData }: EventFormProps) {
  const eventFormProps = useEventForm(propertyId, initialEventData, initialExtraData);
  const { eventData, editing, showMainDataForm, showExtraDataForm } = eventFormProps;
  const tab = useSearchParams().get('t') || 'type';

  return (
    <EventFormProvider
      {...eventFormProps}
      propertyId={propertyId}>
      <div className='md:w-[70%] xs:w-full flex flex-col gap-4'>
        <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
        <CarouselProvider defaultSlot={tab}>
          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
                <TabButton>Tyyppi</TabButton>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                <TabButton>Kohde</TabButton>
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

          <CarouselProvider.Slot slotName='type'>
            <BoxFieldset legend='Valitse tapahtuman tyyppi'>
              <EventTypeSelector />
            </BoxFieldset>
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='target'>
            <BoxFieldset legend='Tapahtuman kohde'>
              {eventData.event_type_id ? (
                <div className='flex flex-col gap-2'>
                  <span>Valittu tapahtumatyyppi: {eventData.event_type_id}</span>
                  <EventTargetSelector />
                </div>
              ) : (
                <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
                  <Notification variant='warning'>Valitse ensin tapahtuman tyyppi.</Notification>
                </CarouselProvider.SelectSlotTrigger>
              )}
            </BoxFieldset>
          </CarouselProvider.Slot>

          <CarouselProvider.Slot slotName='data'>
            <BoxFieldset legend='Tiedot'>
              <div className='flex flex-col gap-4 w-full'>
                {eventData.target_id ? (
                  <>
                    <RenderOnCondition condition={showExtraDataForm()}>
                      <ExtraDataForm editing={eventData} />
                    </RenderOnCondition>

                    <RenderOnCondition condition={showMainDataForm()}>
                      <MainDataForm editing={eventData} />
                    </RenderOnCondition>
                  </>
                ) : (
                  <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                    <Notification variant='warning'>Valitse ensin tapahtuman kohde.</Notification>
                  </CarouselProvider.SelectSlotTrigger>
                )}
              </div>
            </BoxFieldset>
          </CarouselProvider.Slot>
        </CarouselProvider>
      </div>
    </EventFormProvider>
  );
}
