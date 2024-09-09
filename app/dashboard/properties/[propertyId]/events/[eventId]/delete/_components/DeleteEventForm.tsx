'use client';

import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { deleteEventAction } from './actions';

type DeleteEventFormProps = {
  event: EventDataType;
};

export function DeleteEventForm({ event }: DeleteEventFormProps) {
  return (
    <ObjectDeletionForm
      objectId={event.id}
      returnUrl={`/dashboard/properties/${event.parentId}/events`}
      deleteMethod={async data => await deleteEventAction(event.id)}>
      Olet poistamassa tapahtumaa {event.title}. Oletko varma?
    </ObjectDeletionForm>
  );
}
