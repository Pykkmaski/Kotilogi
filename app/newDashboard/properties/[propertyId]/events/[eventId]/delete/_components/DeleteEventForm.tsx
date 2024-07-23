'use client';

import { ADeletePropertyEvent } from '@/actions/events';
import { FormBase } from '@/components/New/Forms/FormBase';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export function DeleteEventForm({ event }) {
  const router = useRouter();

  const deleteAction = async () => {
    await ADeletePropertyEvent(event.id);
    router.replace(`/newDashboard/properties/${event.parentId}/events`);
  };
  return (
    <FormBase className='flex flex-col text-center'>
      Olet poistamassa tapahtumaa {event.title}. Oletko varma?
      <div className='flex justify-end'>
        <Button
          startIcon={<Check />}
          variant='text'
          className='text-teal-500 font-semibold hover:underline cursor-pointer'
          onClick={deleteAction}>
          Vahvista
        </Button>
      </div>
    </FormBase>
  );
}
