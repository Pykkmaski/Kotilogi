'use client';

import { ObjectSubmissionForm } from '@/components/New/Forms/ObjectSubmissionForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { createEventAction, updateEventAction } from './actions';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
};

export function EventForm({ propertyId, eventData }: EventFormProps) {
  const startTime =
    eventData &&
    eventData.startTime &&
    new Date(parseInt(eventData.startTime.toString())).toISOString().split('T').at(0);
  const endTime =
    eventData &&
    eventData.endTime &&
    new Date(parseInt(eventData.endTime.toString())).toISOString().split('T').at(0);

  return (
    <ObjectSubmissionForm
      initialData={{
        ...eventData,
        startTime,
        endTime,
      }}
      onSubmit={async (data, files) => {
        if (eventData) {
          await updateEventAction(eventData.id, data);
        } else {
          await createEventAction(eventData.parentId, data, files);
        }
      }}>
      <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
      <Fieldset legend='Tiedot'>
        <FormControl
          label='Otsikko'
          required
          control={
            <Input
              placeholder='Kirjoita tapahtuman otsikko...'
              name='title'
              required
              defaultValue={eventData && eventData.title}
            />
          }
        />

        <FormControl
          label='Aloitusaika'
          required
          control={
            <Input
              type='date'
              name='startTime'
              defaultValue={startTime}
            />
          }
        />

        {eventData ? (
          <FormControl
            label='Lopetusaika'
            control={
              <Input
                type='date'
                name='endTime'
                defaultValue={endTime}
              />
            }
          />
        ) : null}

        <FormControl
          label='Kuvaus'
          control={
            <textarea
              placeholder='Kirjoita tapahtuman kuvaus...'
              name='description'
              spellCheck={false}
              required
              defaultValue={eventData && eventData.description}
            />
          }
        />
      </Fieldset>
    </ObjectSubmissionForm>
  );
}
