import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { Notification } from '@/components/UI/Notification';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

export const EventTypeSelector = () => {
  const {
    refs: { eventTypes },
  } = useEventTypeContext() as {
    refs: {
      eventTypes: { id: number; label: string }[];
    };
  };
  const { eventData, updateEventData, refs } = useEventFormContext();

  return (
    <div className='flex flex-col gap-4'>
      <ChipRadioGroup
        currentValue={eventData.event_type_id}
        name='event_type_id'
        valueKey='id'
        labelKey='label'
        dataArray={eventTypes}
        onChange={updateEventData}
      />
      {eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Peruskorjaus') ? (
        <Notification
          variant='default'
          position='start'>
          Peruskorjauksella tarkoitetaan talon osan vaihtamista tai korvaamista täysin uudella.
        </Notification>
      ) : eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Huoltotyö') ? (
        <Notification position='start'>
          Huoltotyöllä tarkoitetaan talon osan korjausta ja huoltoa.
        </Notification>
      ) : eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Muu') ? (
        <Notification position='start'>
          Teitkö satunnaisen työn jota ei voi helposti kategorisoida? Valitse Muu.
        </Notification>
      ) : null}
    </div>
  );
};
