'use client';

import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider } from './EventFormContext';
import { useEventForm } from './hooks/useEventForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { TabButton } from '@/components/UI/TabButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { EventTypeSelector } from './Selectors/EventTypeSelector';
import { BoxFieldset } from '@/components/UI/BoxFieldset';

import { FieldsetContainer } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm';
import { EventDataContent } from './EventDataContent';
import { FormNav } from './FormNav';
import { EventTargetContent } from './EventTargetContent';

type EventFormProps = {
  propertyId: string;
  initialEventData?: EventPayloadType & Required<Pick<EventPayloadType, 'id'>>;
  initialExtraData?: any;
};

export function EventForm({ propertyId, initialEventData, initialExtraData }: EventFormProps) {
  const eventFormProps = useEventForm(propertyId, initialEventData, initialExtraData);
  const router = useRouter();
  const pathname = usePathname();

  const { editing, onSubmit, eventData } = eventFormProps;

  const tab = useSearchParams().get('t') || editing ? 'target' : 'type';
  const updateSlot = (slotName: string) => {
    router.replace(`${pathname}?t=${slotName}`);
  };

  console.log('Malja');
  console.log('Event data: ', eventData);
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
            <CarouselHeader isEditing={editing} />
            {!editing && (
              <CarouselProvider.Slot slotName='type'>
                <BoxFieldset legend='Valitse tapahtuman tyyppi'>
                  <FieldsetContainer>
                    <CarouselProvider.NextTrigger>
                      <EventTypeSelector />
                      <FormNav />
                    </CarouselProvider.NextTrigger>
                  </FieldsetContainer>
                </BoxFieldset>
              </CarouselProvider.Slot>
            )}

            <CarouselProvider.Slot slotName='target'>
              <BoxFieldset legend='Tapahtuman kohde'>
                <FieldsetContainer>
                  <EventTargetContent />
                  <FormNav />
                </FieldsetContainer>
              </BoxFieldset>
            </CarouselProvider.Slot>

            <CarouselProvider.Slot slotName='data'>
              <BoxFieldset legend='Tiedot'>
                <FieldsetContainer>
                  <EventDataContent />
                </FieldsetContainer>
              </BoxFieldset>
            </CarouselProvider.Slot>
          </CarouselProvider>
        </div>
      </EventFormProvider>
    </form>
  );
}

const CarouselHeader = ({ isEditing }) => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-4 items-center'>
        {!isEditing && (
          <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
            <TabButton>Tyyppi</TabButton>
          </CarouselProvider.SelectSlotTrigger>
        )}

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
