'use client';

import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventProvider } from './EventContext';
import { useState } from 'react';
import { useEventForm } from './EventForm.hooks';
import { SharedEventDataInputs } from './SharedEventDataInputs';
import { MainEventTypeSelector } from './Selectors/MainEventTypeSelector';
import { EventTargetSelector } from './Selectors/EventTargetSelector';
import { createEventAction, updateEventAction } from './actions';
import { EventWorkSelector } from './Selectors/EventWorkSelector';
import { WindowRenovationContent } from './FormContent/WindowRenovationContent';
import { HeatingRenovationContent } from './FormContent/HeatingRenovationContent';
import toast from 'react-hot-toast';
import { Button } from '@/components/New/Button';
import { Spacer } from '@/components/New/Spacer';
import { useRouter } from 'next/navigation';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
};

export function EventForm({ propertyId, eventData }: EventFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const { data, cancel, update: updateData, getIdByLabel, refs } = useEventForm(eventData);

  const getContent = () => {
    const { targetId } = data;

    var content = null;
    if (targetId == getIdByLabel(refs.eventTargets, 'Ikkunat')) {
      content = <WindowRenovationContent />;
    } else if (targetId == getIdByLabel(refs.eventTargets, 'Lämmitys')) {
      content = <HeatingRenovationContent />;
    } else {
      console.error(
        'Additional content not implemented for event type with id ' + data.secondaryEventTypeId
      );
    }

    return (content && <Fieldset legend='Tiedot'>{content}</Fieldset>) || null;
  };

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (eventData) {
        await updateEventAction(eventData.id, data);
      } else {
        await createEventAction(propertyId, data, []);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus(prev => (prev != 'done' ? 'idle' : prev));
    }
  };

  const isDefined = (val: any) => val != null && val != undefined;
  const submitDisabled =
    !isDefined(data.mainTypeId) ||
    !isDefined(data.targetId) ||
    !isDefined(data.workTypeId) ||
    status !== 'idle';

  return (
    <EventProvider
      event={data}
      propertyId={propertyId}>
      <form
        onSubmit={onSubmit}
        onChange={updateData}
        className='md:w-[50%] xs:w-full flex flex-col gap-4'>
        <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
        <Fieldset legend='Osastojen valinta'>
          <FormControl
            boldLabelText
            required
            label='Osasto'
            control={<MainEventTypeSelector />}
          />

          {isDefined(data.mainTypeId) && <EventTargetSelector />}
          {isDefined(data.mainTypeId) && isDefined(data.targetId) && <EventWorkSelector />}
        </Fieldset>

        {isDefined(data.mainTypeId) && isDefined(data.targetId) && isDefined(data.workTypeId) && (
          <>
            {getContent()}
            <SharedEventDataInputs />
          </>
        )}

        <Spacer
          direction='row'
          gap={4}
          width='full'
          justifyItems='end'>
          <Button
            variant='text'
            onClick={cancel}>
            Peruuta
          </Button>

          <Button
            variant='contained'
            type='submit'
            disabled={submitDisabled}>
            {(eventData && 'Päivitä') || 'Vahvista'}
          </Button>
        </Spacer>
      </form>
    </EventProvider>
  );
}
