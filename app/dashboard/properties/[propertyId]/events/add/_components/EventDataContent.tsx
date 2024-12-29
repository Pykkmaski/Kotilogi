import { BoxFieldset } from '@/components/UI/Fieldset';
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

/**Renders the content of the event form data-tab */
export function EventDataContent() {
  const { eventData, refs, showMainDataForm, isSubmitDisabled, selectedSurfaceIds } =
    useEventFormContext();
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

  return (
    <BoxFieldset legend='Tiedot'>
      <div className='flex flex-col gap-10 w-full'>
        {eventData.target_id || selectedSurfaceIds.length > 0 ? (
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
                        {workTypes.find(t => t.id == eventData.service_work_type_id)?.label}
                      </span>
                    )}
                  </Notification>
                </CarouselProvider.SelectSlotTrigger>
              ) : eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Huoltotyö') &&
                eventData.target_id != getIdByLabel(refs.eventTargets, 'Muu') ? (
                <CarouselProvider.SelectSlotTrigger slotToSelect='target'>
                  <Notification
                    position='start'
                    variant='error'>
                    Työn tyyppi puuttuu!
                  </Notification>
                </CarouselProvider.SelectSlotTrigger>
              ) : null}
            </div>

            {showMainDataForm && <MainDataForm editing={eventData} />}
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
  );
}
