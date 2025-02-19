import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { useEventFormContext } from './EventFormContext';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { Notification } from '@/components/UI/Notification';
import Spinner from '@/components/UI/Spinner';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { getServiceWorkTypes } from './actions';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { MainDataForm } from './Forms/MainDataForm';
import { Button } from '@/components/New/Button';
import { Check } from '@mui/icons-material';
import { EventType } from 'kotilogi-app/types/EventType';
import { TargetType } from 'kotilogi-app/types/TargetType';

/**Renders the content of the event form data-tab */
export function EventDataContent() {
  const { eventData, showMainDataForm, isSubmitDisabled, selectedSurfaceIds, status, payload } =
    useEventFormContext();
  const {
    data: workTypes,
    isLoading: workTypesIsLoading,
    error: workTypesError,
  } = useQuery({
    queryKey: [`work-types-${eventData.target_type}`],
    queryFn: async () => getServiceWorkTypes(eventData.target_type),
    enabled: eventData.target_type && eventData.event_type == EventType.HUOLTOTYÖ,
  });

  return (
    <BoxFieldset legend='Tiedot'>
      <div className='flex flex-col gap-10 w-full'>
        {eventData.target_type || selectedSurfaceIds.length > 0 ? (
          <>
            <div className='flex flex-col gap-2'>
              <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
                <Notification
                  variant='success'
                  position='start'
                  title='Muuta tapahtumatyyppiä...'>
                  Valittu tapahtumatyyppi:{' '}
                  <span className='font-semibold'>{eventData.event_type}</span>
                </Notification>
              </CarouselProvider.SelectSlotTrigger>

              <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                <Notification
                  variant='success'
                  position='start'
                  title='Muuta tapahtuman kohdetta...'>
                  Valittu kohde: <span className='font-semibold'>{eventData.target_type}</span>
                </Notification>
              </CarouselProvider.SelectSlotTrigger>
              {payload?.maintenance_type ? (
                <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                  <Notification
                    position='start'
                    variant='success'>
                    Valittu työn tyyppi:{' '}
                    {workTypesIsLoading ? (
                      <Spinner message='Ladataan työtyyppiä...' />
                    ) : (
                      <span className='font-semibold'>{payload?.maintenance_type}</span>
                    )}
                  </Notification>
                </CarouselProvider.SelectSlotTrigger>
              ) : eventData.event_type == EventType.HUOLTOTYÖ &&
                eventData.target_type != TargetType.MUU ? (
                <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                  <Notification
                    position='start'
                    variant='error'>
                    Työn tyyppi puuttuu!
                  </Notification>
                </CarouselProvider.SelectSlotTrigger>
              ) : eventData.event_type == EventType.PINTAREMONTTI &&
                selectedSurfaceIds.length == 0 ? (
                <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                  <Notification
                    position='start'
                    variant='error'>
                    Pinnat puuttuvat!
                  </Notification>
                </CarouselProvider.SelectSlotTrigger>
              ) : null}
            </div>

            {showMainDataForm && <MainDataForm editing={eventData} />}
          </>
        ) : eventData.event_type != EventType.PINTAREMONTTI ? (
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
  );
}
