'use client';

import { updateEvent } from 'kotilogi-app/actions/experimental/events';
import { ContentCard } from '@/components/UI/RoundedBox';
import { Input, Textarea } from '@/components/Feature/Input';
import { SingleInputForm } from '@/components/Feature/SingleInputForm/SingleInputForm';

type ContentProps = {
  event: Kotidok.EventType;
  userEmail: string;
};

export function Content({ event, userEmail }: ContentProps) {
  const isConsolidated = event.createdBy !== userEmail;

  const update = (data: TODO) => {
    return updateEvent(event.id, data as TODO);
  };

  return (
    <>
      <ContentCard title='Tiedot'>
        <SingleInputForm
          editingDisabled={isConsolidated}
          submitMethod={update}
          inputComponent={Input}
          initialInputProps={{
            label: 'Otsikko',
            name: 'title',
            description: 'Tapahtuman otsikko.',
            placeholder: 'Kirjoita tapahtuman otsikko...',
            defaultValue: event.title,
            autoComplete: 'off',
          }}
        />

        <SingleInputForm
          editingDisabled={isConsolidated}
          submitMethod={update}
          inputComponent={Textarea}
          initialInputProps={{
            label: 'Kuvaus',
            name: 'description',
            description: 'Tapahtuman kuvaus.',
            placeholder: 'Kirjoita tapahtuman kuvaus...',
            defaultValue: event.description,
            spellCheck: false,
          }}
        />

        <SingleInputForm
          editingDisabled={isConsolidated}
          submitMethod={update}
          inputComponent={Input}
          initialInputProps={{
            label: 'Päiväys',
            name: 'time',
            description: 'Tapahtuman päiväys.',
            type: 'date',
            defaultValue: event.time,
          }}
        />
      </ContentCard>
    </>
  );
}
