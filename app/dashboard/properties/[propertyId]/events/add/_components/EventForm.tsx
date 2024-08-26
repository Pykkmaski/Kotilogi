'use client';

import { ACreatePropertyEvent, AUpdatePropertyEvent } from '@/actions/events';
import { ObjectSubmissionForm } from '@/components/New/Forms/ObjectSubmissionForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input } from '@/components/UI/FormUtils';
import axios from 'axios';
import { EventDataType } from 'kotilogi-app/models/types';

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
      parentId={propertyId}
      item={eventData}
      onSubmit={async (data, files) => {
        if (eventData) {
          return await axios.patch('/api/protected/properties/events', {
            id: eventData.id,
            ...data,
          });
        } else {
          return await axios.post('/api/protected/properties/events', {
            ...data,
            parentId: propertyId,
          });
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
