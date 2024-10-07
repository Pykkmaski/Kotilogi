'use client';

import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider } from './EventFormContext';
import { useState } from 'react';
import { useEventForm } from './hooks/useEventForm';
import { createEventAction, updateEventAction } from './actions';
import toast from 'react-hot-toast';
import { isDefined } from './util';
import { TypeDataForm } from './Forms/TypeDataForm';
import { MainDataForm } from './Forms/MainDataForm';
import { ExtraDataForm } from './Forms/ExtraDataForm';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
};

export function EventForm({ propertyId, eventData }: EventFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const {
    mainData,
    typeData,
    extraData,
    updateMainData,
    updateTypeData,
    updateExtraData,
    cancel,
    getIdByLabel,
    refs,
  } = useEventForm(eventData);

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

  const showMainDataForm = () => {
    return (
      isDefined(typeData.mainTypeId) &&
      isDefined(typeData.targetId) &&
      (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus') ||
        isDefined(typeData.workTypeId))
    );
  };

  return (
    <EventFormProvider
      status={status}
      onSubmit={onSubmit}
      cancel={cancel}
      mainData={mainData}
      updateMainData={updateMainData}
      typeData={typeData}
      updateTypeData={updateTypeData}
      extraData={extraData}
      updateExtraData={updateExtraData}
      propertyId={propertyId}>
      <div className='md:w-[50%] xs:w-full flex flex-col gap-4'>
        <TypeDataForm editing={eventData} />
        <ExtraDataForm editing={eventData} />
        {showMainDataForm() && <MainDataForm editing={eventData} />}
      </div>
    </EventFormProvider>
  );
}
