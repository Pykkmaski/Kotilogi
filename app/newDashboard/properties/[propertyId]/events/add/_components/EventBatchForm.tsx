'use client';
import { ACreatePropertyEvent } from '@/actions/events';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { BatchUploadForm } from '@/components/New/Forms/BatchUploadForm';
import { FormControl, Input } from '@/components/UI/FormUtils';
import axios from 'axios';
import { EventDataType } from 'kotilogi-app/models/types';

export function EventBatchForm({ propertyId }: { propertyId: string }) {
  return (
    <BatchUploadForm<EventDataType>
      title='Lisää tapahtumia'
      entryComponent={({ entry }) => {
        return <ContentBox>{entry.title}</ContentBox>;
      }}
      onSubmit={async (entries, files) => {
        await axios.post('/api/properties/events', {
          data: entries.map(entry => {
            return {
              data: entry,
              fdata: files,
            };
          }),
        });
      }}
      isAddingDisabled={data => {
        return data.title === undefined || data.startTime === undefined;
      }}>
      <FormControl
        label='Otsikko'
        required
        control={
          <Input
            placeholder='Kirjoita tapahtuman otsikko...'
            name='title'
            required
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
          />
        }
      />

      <FormControl
        label='Kuvaus'
        control={
          <textarea
            placeholder='Kirjoita tapahtuman kuvaus...'
            name='description'
            spellCheck={false}
            required
          />
        }
      />

      <FormControl
        label='Tiedostot'
        control={
          <Input
            type='file'
            accept='image/jpeg;application/pdf'
            multiple
          />
        }
      />
    </BatchUploadForm>
  );
}
