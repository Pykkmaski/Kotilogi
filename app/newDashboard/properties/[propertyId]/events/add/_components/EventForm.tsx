'use client';

import { ACreatePropertyEvent, AUpdatePropertyEvent } from '@/actions/events';
import { FormBase } from '@/components/New/Forms/FormBase';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { FormStatus, useDataSubmissionForm } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { EventDataType } from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType;
};

export function EventForm({ propertyId, eventData }: EventFormProps) {
  const { data, updateData, onSubmit, status } = useDataSubmissionForm(
    AUpdatePropertyEvent,
    ACreatePropertyEvent,
    eventData || {
      parentId: propertyId,
    }
  );

  const router = useRouter();
  console.log(data);
  return (
    <FormBase
      onChange={updateData}
      onSubmit={onSubmit}>
      <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
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
            defaultValue={eventData && new Date(eventData.startTime).toUTCString()}
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
              defaultValue={eventData && new Date(eventData.endTime).toString()}
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
            required
            defaultValue={eventData && eventData.description}
          />
        }
      />
      <div className='w-full flex justify-end gap-4'>
        <Button
          disabled={status == FormStatus.LOADING}
          onClick={() => router.back()}
          variant='text'
          type='button'>
          Peruuta
        </Button>
        <Button
          disabled={status == FormStatus.LOADING}
          variant='contained'
          startIcon={<Check />}
          type='submit'>
          Vahvista
        </Button>
      </div>
    </FormBase>
  );
}
