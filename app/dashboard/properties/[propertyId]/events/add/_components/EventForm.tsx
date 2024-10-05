'use client';

import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl } from '@/components/UI/FormUtils';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider, useEventFormContext } from './EventFormContext';
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

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
};

export function EventForm({ propertyId, eventData }: EventFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const {
    mainData,
    typeData,
    updateMainData,
    updateTypeData,

    extraData,

    cancel,

    update: updateData,
    updateExtraData,

    getIdByLabel,
    refs,
  } = useEventForm(eventData);

  const getContent = () => {
    const { targetId } = typeData;

    var content = null;
    if (targetId == getIdByLabel(refs.eventTargets, 'Ikkunat')) {
      content = <WindowRenovationContent />;
    } else if (targetId == getIdByLabel(refs.eventTargets, 'Lämmitys')) {
      content = <HeatingRenovationContent />;
    } else {
      console.error(
        'Additional content not implemented for target type with id ' + typeData.targetId
      );
    }

    return (content && <Fieldset legend='Tiedot'>{content}</Fieldset>) || null;
  };

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (eventData) {
        await updateEventAction(eventData.id, mainData, typeData);
      } else {
        await createEventAction(propertyId, mainData, typeData);
      }
      setStatus('done');
      localStorage.removeItem('kotidok-event-extra-data');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus(prev => (prev != 'done' ? 'idle' : prev));
    }
  };

  const isDefined = (val: any) => val != null && val != undefined;
  const submitDisabled =
    !isDefined(typeData.mainTypeId) ||
    !isDefined(typeData.targetId) ||
    !isDefined(typeData.workTypeId) ||
    status !== 'idle';

  return (
    <EventFormProvider
      mainData={mainData}
      typeData={typeData}
      extraData={extraData}
      propertyId={propertyId}>
      <div className='md:w-[50%] xs:w-full flex flex-col gap-4'>
        <form
          className='flex flex-col gap-4'
          id='typeForm'
          onChange={updateTypeData}>
          <SecondaryHeading>
            {eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}
          </SecondaryHeading>
          <Fieldset legend='Osastojen valinta'>
            <FormControl
              boldLabelText
              required
              label='Osasto'
              control={<MainEventTypeSelector />}
            />

            {isDefined(typeData.mainTypeId) && <EventTargetSelector />}
            {isDefined(typeData.mainTypeId) && isDefined(typeData.targetId) && (
              <EventWorkSelector />
            )}
          </Fieldset>
        </form>

        <form
          id='extraDataForm'
          className='flex flex-col gap-4'
          onChange={updateExtraData}>
          {getContent()}
        </form>

        {isDefined(typeData.mainTypeId) &&
          isDefined(typeData.targetId) &&
          isDefined(typeData.workTypeId) && (
            <form
              id='mainDataForm'
              onSubmit={onSubmit}
              onChange={updateMainData}
              className='flex flex-col gap-4'>
              <SharedEventDataInputs />

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
          )}
      </div>
    </EventFormProvider>
  );
}
