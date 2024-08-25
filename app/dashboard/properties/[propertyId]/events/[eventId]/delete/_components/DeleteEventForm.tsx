'use client';

import { ADeletePropertyEvent } from '@/actions/events';
import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { EventDataType } from 'kotilogi-app/models/types';
import toast from 'react-hot-toast';

type DeleteEventFormProps = {
  event: EventDataType;
};

export function DeleteEventForm({ event }: DeleteEventFormProps) {
  return (
    <ObjectDeletionForm
      objectId={event.id}
      returnUrl={`/newDashboard/properties/${event.parentId}/events`}
      deleteMethod={async data => {
        return await ADeletePropertyEvent(data.id).then(res => {
          switch (res) {
            case -1:
              toast.error('Tapahtumaa ei voi poistaa, sillä et ole sen laatija!');
              break;
          }

          return res;
        });
      }}>
      Olet poistamassa tapahtumaa {event.title}. Oletko varma?
    </ObjectDeletionForm>
  );
}
