'use client';

import { ACreatePropertyEvent, AUpdatePropertyEvent } from '@/actions/events';
import { ObjectSubmissionForm } from '@/components/New/Forms/ObjectSubmissionForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { EventDataType } from 'kotilogi-app/models/types';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
};

export function EventForm({ propertyId, eventData }: EventFormProps) {
  return (
    <ObjectSubmissionForm
      parentId={propertyId}
      item={eventData}
      createMethod={async data => {
        await ACreatePropertyEvent(data as TODO);
      }}
      updateMethod={async data => {
        await AUpdatePropertyEvent(data as TODO);
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
              defaultValue={
                eventData && new Date(eventData.startTime).toISOString().split('T').at(0)
              }
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
                defaultValue={
                  eventData &&
                  eventData.endTime &&
                  new Date(eventData.endTime).toISOString().split('T').at(0)
                }
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
