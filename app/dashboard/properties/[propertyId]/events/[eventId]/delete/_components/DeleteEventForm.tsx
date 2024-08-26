'use client';

import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import axios from 'axios';
import { EventDataType } from 'kotilogi-app/models/types';

type DeleteEventFormProps = {
  event: EventDataType;
};

export function DeleteEventForm({ event }: DeleteEventFormProps) {
  return (
    <ObjectDeletionForm
      objectId={event.id}
      returnUrl={`/newDashboard/properties/${event.parentId}/events`}
      deleteMethod={async data => {
        return await axios.delete(`/api/protected/properties/events?id=${event.id}`);
      }}>
      Olet poistamassa tapahtumaa {event.title}. Oletko varma?
    </ObjectDeletionForm>
  );
}
