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

const FormNav = () => {
  return (
    <div className='flex gap-2 w-full justify-end'>
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

  const {
    eventData,
    editing,
    status,
    showMainDataForm,
    showExtraDataForm,
    isSubmitDisabled,
    refs,
    onSubmit,
    updateEventData,
  } = eventFormProps;
  const tab = useSearchParams().get('t') || 'type';

  const {
    data: workTypes,
    isLoading: workTypesIsLoading,
    error: workTypesError,
  } = useQuery({
    queryKey: [`work-types-${eventData.target_id}`],
    queryFn: async () => getServiceWorkTypes(eventData.target_id),
    enabled:
      eventData.target_id && eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Huoltotyö'),
  });

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
                  <EventTypeSelector />
                  <FormNav />
                </FieldsetContainer>
              </BoxFieldset>
            </CarouselProvider.Slot>

            <CarouselProvider.Slot slotName='target'>
              <BoxFieldset legend='Tapahtuman kohde'>
                <FieldsetContainer>
                  {eventData.event_type_id ? (
                    <div className='flex flex-col gap-10 w-full'>
                      <Notification
                        variant='success'
                        position='start'>
                        Valittu tapahtumatyyppi:{' '}
                        <span className='font-semibold'>
                          {refs.eventTypes.find(t => t.id == eventData.event_type_id)?.label}
                        </span>
                      </Notification>

                      {eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Peruskorjaus') ? (
                        <RestorationWorkContent />
                      ) : eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Huoltotyö') ? (
                        <ServiceWorkContent />
                      ) : eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Muu') ? (
                        <OtherWorkContent />
                      ) : eventData.event_type_id ==
                        getIdByLabel(refs.eventTypes, 'Pintaremontti') ? (
                        <SurfaceWorkContent />
                      ) : (
                        <Notification
                          variant='error'
                          position='start'>
                          Valittua tapahtumatyyppiä ei vielä tueta!
                        </Notification>
                      )}
                    </div>
                  ) : (
                    <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
                      <Notification variant='error'>Valitse ensin tapahtuman tyyppi.</Notification>
                    </CarouselProvider.SelectSlotTrigger>
                  )}
                  <FormNav />
                </FieldsetContainer>
              </BoxFieldset>
            </CarouselProvider.Slot>

            <CarouselProvider.Slot slotName='data'>
              <BoxFieldset legend='Tiedot'>
                <div className='flex flex-col gap-10 w-full'>
                  {eventData.target_id ? (
                    <>
                      <div className='flex flex-col gap-2'>
                        <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
                          <Notification
                            variant='success'
                            position='start'
                            title='Muuta tapahtumatyyppiä...'>
                            Valittu tapahtumatyyppi:{' '}
                            <span className='font-semibold'>
                              {refs.eventTypes.find(t => t.id == eventData.event_type_id)?.label}
                            </span>
                          </Notification>
                        </CarouselProvider.SelectSlotTrigger>

                        <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                          <Notification
                            variant='success'
                            position='start'
                            title='Muuta tapahtuman kohdetta...'>
                            Valittu kohde:{' '}
                            <span className='font-semibold'>
                              {refs.eventTargets.find(t => t.id == eventData.target_id)?.label}
                            </span>
                          </Notification>
                        </CarouselProvider.SelectSlotTrigger>
                        {eventData.service_work_type_id ? (
                          <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                            <Notification
                              position='start'
                              variant='success'>
                              Valittu työn tyyppi:{' '}
                              {workTypesIsLoading ? (
                                <Spinner message='Ladataan työtyyppiä...' />
                              ) : (
                                <span className='font-semibold'>
                                  {
                                    workTypes.find(t => t.id == eventData.service_work_type_id)
                                      ?.label
                                  }
                                </span>
                              )}
                            </Notification>
                          </CarouselProvider.SelectSlotTrigger>
                        ) : eventData.event_type_id ==
                          getIdByLabel(refs.eventTypes, 'Huoltotyö') ? (
                          <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                            <Notification
                              position='start'
                              variant='error'>
                              Työn tyyppi puuttuu!
                            </Notification>
                          </CarouselProvider.SelectSlotTrigger>
                        ) : null}
                      </div>

                      <RenderOnCondition condition={showMainDataForm}>
                        <MainDataForm editing={eventData} />
                      </RenderOnCondition>
                    </>
                  ) : eventData.event_type_id != getIdByLabel(refs.eventTypes, 'Pintaremontti') ? (
                    <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                      <Notification
                        variant='error'
                        position='start'>
                        Valitse ensin tapahtuman kohde.
                      </Notification>
                    </CarouselProvider.SelectSlotTrigger>
                  ) : null}
                  <div className='flex w-full gap-4 justify-end'>
                    <CarouselProvider.PreviousTrigger>
                      <Button
                        color='secondary'
                        variant='text'>
                        Edellinen
                      </Button>
                    </CarouselProvider.PreviousTrigger>

                    <Button
                      disabled={isSubmitDisabled}
                      variant='contained'
                      startIcon={status == 'loading' ? <Spinner /> : <Check />}
                      color='secondary'
                      type='submit'>
                      Vahvista
                    </Button>
                  </div>
                </div>
              </BoxFieldset>
            </CarouselProvider.Slot>
          </CarouselProvider>
        </div>
      </EventFormProvider>
    </form>
  );
}
