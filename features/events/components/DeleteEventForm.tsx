'use client';

import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { deleteEventAction } from '../actions/deleteEventAction';
import { EventPayloadType } from '../types/EventPayloadType';

type DeleteEventFormProps = {
  event: EventPayloadType;
};

export function DeleteEventForm({ event }: DeleteEventFormProps) {
  return (
    <ObjectDeletionForm
      objectId={event.id}
      returnUrl={`/dashboard/properties/${event.property_id}/events`}
      deleteMethod={async () => await deleteEventAction(event.id)}>
      Olet poistamassa tapahtumaa {event.title}. Oletko varma?
    </ObjectDeletionForm>
  );
}
