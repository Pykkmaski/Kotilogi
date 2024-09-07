'use client';

import { ADeletePropertyEvent } from '@/actions/events';
import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import axios from 'axios';
import { EventDataType } from 'kotilogi-app/dataAccess/types';

type DeleteEventFormProps = {
  event: EventDataType;
};

export function DeleteEventForm({ event }: DeleteEventFormProps) {
  return (
    <ObjectDeletionForm
      objectId={event.id}
      returnUrl={`/dashboard/properties/${event.parentId}/events`}
      deleteMethod={async data => await ADeletePropertyEvent(event.id)}>
      Olet poistamassa tapahtumaa {event.title}. Oletko varma?
    </ObjectDeletionForm>
  );
}
