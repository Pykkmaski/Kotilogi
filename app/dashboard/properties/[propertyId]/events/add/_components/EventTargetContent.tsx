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

/**Renders the content of the event form target-tab */
export function EventTargetContent() {
  const { eventData, refs } = useEventFormContext();

  return (
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
            ) : eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Pintaremontti') ? (
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
  );
}
