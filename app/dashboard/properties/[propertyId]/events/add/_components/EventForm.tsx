'use client';

import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider } from './EventFormContext';
import { useEventForm } from './hooks/useEventForm';
import { TypeDataForm } from './Forms/TypeDataForm';
import { MainDataForm } from './Forms/MainDataForm';
import { ExtraDataForm } from './Forms/ExtraDataForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
  initialExtraData?: any;
};

export function EventForm({ propertyId, eventData, initialExtraData }: EventFormProps) {
  const eventFormProps = useEventForm(propertyId, eventData, initialExtraData);
  const { editing, showMainDataForm, showExtraDataForm } = eventFormProps;

  console.log('Is editing: ', editing);
  return (
    <EventFormProvider
      {...eventFormProps}
      propertyId={propertyId}>
      <div className='md:w-[50%] xs:w-full flex flex-col gap-4'>
        <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>

        <RenderOnCondition condition={!editing}>
          <TypeDataForm />
        </RenderOnCondition>

        <RenderOnCondition condition={showExtraDataForm()}>
          <ExtraDataForm editing={eventData} />
        </RenderOnCondition>

        <RenderOnCondition condition={showMainDataForm()}>
          <MainDataForm editing={eventData} />
        </RenderOnCondition>
      </div>
    </EventFormProvider>
  );
}
