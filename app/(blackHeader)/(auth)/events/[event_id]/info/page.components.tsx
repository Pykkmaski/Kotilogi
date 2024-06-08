'use client';

import { updateEvent } from 'kotilogi-app/actions/experimental/events';
import { ContentCard } from '@/components/UI/RoundedBox';
import { SingleInputForm } from '@/components/Feature/SingleInputForm/SingleInputForm';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { useInputData } from '@/hooks/useInputData';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

type ContentProps = {
  event: Kotidok.EventType;
  userEmail: string;
};

export function Content({ event, userEmail }: ContentProps) {
  const isEditable = event.createdBy === userEmail;
  const initialRender = useRef(true);

  const { updateData, data } = useInputData(event);

  const update = () => {
    return updateEvent(event.id, data as TODO);
  };

  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      update().catch(err => toast.error('Tietojen päivitys epäonnistui!'));
    }, 250);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <>
      <ContentCard title='Tiedot'>
        <form onChange={updateData}>
          <FormControl
            label='Otsikko'
            control={
              <Input
                name='title'
                placeholder='Kirjoita tapahtuman otsikko...'
                defaultValue={event.title}
                autoComplete='off'
                disabled={!isEditable}
              />
            }
          />

          <FormControl
            label='Kuvaus'
            control={
              <textarea
                name='description'
                placeholder='Kirjoita tapahtuman kuvaus...'
                defaultValue={event.description}
                spellCheck={false}
                disabled={!isEditable}
              />
            }
          />

          <FormControl
            label='Päiväys'
            control={
              <Input
                name='time'
                type='date'
                defaultValue={event.time}
                disabled={!isEditable}
              />
            }
          />
        </form>
      </ContentCard>
    </>
  );
}
