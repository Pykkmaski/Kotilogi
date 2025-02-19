import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { FieldsetContainer } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm';
import { useEventFormContext } from './EventFormContext';
import { Notification } from '@/components/UI/Notification';
import { RestorationWorkContent } from './RestorationWorkContent';
import { ServiceWorkContent } from './ServiceWorkContent';
import { OtherWorkContent } from './OtherWorkContent';
import { SurfaceWorkContent } from './SurfaceWorkContent';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { FormNav } from './FormNav';
import { EventType } from 'kotilogi-app/types/EventType';

/**Renders the content of the event form target-tab */
export function EventTargetContent() {
  const { eventData } = useEventFormContext();

  return (
    <BoxFieldset legend='Tapahtuman kohde'>
      <FieldsetContainer>
        {eventData.event_type ? (
          <div className='flex flex-col gap-10 w-full'>
            <Notification
              variant='success'
              position='start'>
              Valittu tapahtumatyyppi: <span className='font-semibold'>{eventData.event_type}</span>
            </Notification>

            {eventData.event_type == EventType.PERUSKORJAUS ? (
              <RestorationWorkContent />
            ) : eventData.event_type == EventType.HUOLTOTYÖ ? (
              <ServiceWorkContent />
            ) : eventData.event_type == EventType.MUU ? (
              <OtherWorkContent />
            ) : eventData.event_type == EventType.PINTAREMONTTI ? (
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
            <Notification
              position='start'
              variant='error'>
              Valitse ensin tapahtuman tyyppi.
            </Notification>
          </CarouselProvider.SelectSlotTrigger>
        )}
        <FormNav />
      </FieldsetContainer>
    </BoxFieldset>
  );
}
