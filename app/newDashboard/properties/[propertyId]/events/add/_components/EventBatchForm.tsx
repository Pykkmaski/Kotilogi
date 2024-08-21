'use client';
import { ACreatePropertyEvent } from '@/actions/events';
import { BatchUploadForm } from '@/components/New/Forms/BatchUploadForm';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { EventDataType } from 'kotilogi-app/models/types';

export function EventBatchForm({ propertyId }: { propertyId: string }) {
  return (
    <BatchUploadForm<EventDataType>
      title='Lisää tapahtumia'
      entryComponent={null}
      uploadMethod={async entries => {
        const promises = entries.map(e =>
          ACreatePropertyEvent({ ...e, parentId: propertyId } as TODO)
        );
        await Promise.all(promises);
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
    </BatchUploadForm>
  );
}
