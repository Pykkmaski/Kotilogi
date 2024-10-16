'use client';

import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventFormProvider } from './EventFormContext';
import { useState } from 'react';
import { useEventForm } from './hooks/useEventForm';
import { createEventAction, updateEventAction } from './actions';
import toast from 'react-hot-toast';
import { isDefined } from './util';
import { TypeDataForm } from './Forms/TypeDataForm';
import { MainDataForm } from './Forms/MainDataForm';
import { ExtraDataForm } from './Forms/ExtraDataForm';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Dialog } from '@mui/material';

type EventFormProps = {
  propertyId: string;
  eventData?: EventDataType & Required<Pick<EventDataType, 'id'>>;
  initialExtraData?: any;
};

export function EventForm({ propertyId, eventData, initialExtraData }: EventFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const {
    mainData,
    typeData,
    extraData,
    updateMainData,
    updateTypeData,
    updateExtraData,
    showConfirmationDialog,
    setShowConfirmationDialog,
    cancel,
    files,
    editing,
    selectedSurfaceIds,
    toggleSurfaceId,
    refs,
  } = useEventForm(eventData, initialExtraData);

  const onSubmit = async e => {
    e.preventDefault();

    setStatus('loading');
    try {
      if (eventData) {
        await updateEventAction(eventData.id, mainData, typeData, extraData);
      } else {
        await createEventAction(
          propertyId,
          mainData,
          typeData,
          extraData,
          selectedSurfaceIds,
          files.map(f => {
            const fd = new FormData();
            fd.append('file', f);
            return fd;
          })
        );
      }
      setStatus('done');
      localStorage.removeItem('kotidok-event-extra-data');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus(prev => (prev != 'done' ? 'idle' : prev));
    }
  };

  const showMainDataForm = () => {
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      return isDefined(typeData.targetId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Huoltotyö')) {
      return isDefined(typeData.targetId) && isDefined(typeData.workTypeId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Pintaremontti')) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @todo
   */
  const isSubmitButtonDisabled = () => {
    const defaultRequiredFieldsDefined = () => {
      return isDefined(mainData.date);
    };

    var state: boolean;
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      if (typeData.targetId == getIdByLabel(refs.eventTargets, 'Katto')) {
        state = isDefined(extraData.roofTypeId) && isDefined(extraData.roofMaterialId);
      } else if (typeData.targetId == getIdByLabel(refs.eventTargets, 'Salaojat')) {
        state = isDefined(extraData.toteutusTapaId);
      }
    }
  };

  return (
    <EventFormProvider
      setShowConfirmationDialog={setShowConfirmationDialog}
      editing={editing}
      status={status}
      onSubmit={onSubmit}
      cancel={cancel}
      mainData={mainData}
      updateMainData={updateMainData}
      typeData={typeData}
      updateTypeData={updateTypeData}
      extraData={extraData}
      updateExtraData={updateExtraData}
      selectedSurfaceIds={selectedSurfaceIds}
      toggleSurfaceId={toggleSurfaceId}
      propertyId={propertyId}>
      <Dialog open={showConfirmationDialog}></Dialog>

      <div className='md:w-[50%] xs:w-full flex flex-col gap-4'>
        <SecondaryHeading>{eventData ? 'Muokkaa Tapahtumaa' : 'Lisää Tapahtuma'}</SecondaryHeading>
        {!editing && <TypeDataForm />}
        <ExtraDataForm editing={eventData} />
        {showMainDataForm() && <MainDataForm editing={eventData} />}
      </div>
    </EventFormProvider>
  );
}
