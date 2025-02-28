import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getServiceWorkTypes } from '../../../actions/actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { Notification } from '@/components/UI/Notification';
import { CustomizableSelector } from '@/components/Feature/CustomizableSelector';
import { useEffect } from 'react';

export const EventServiceWorkSelector = () => {
  const { eventData, payload, resetPayload } = useEventFormContext();

  const {
    data: workTypes,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => await getServiceWorkTypes(eventData.target_type),
    queryKey: [`work-types-${eventData.target_type}`],
    enabled: eventData.target_type != undefined,
  });

  useEffect(() => {
    resetPayload({ maintenance_type: null });
  }, [eventData.target_type]);

  return !error ? (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan työtyyppejä...'
      boldLabelText
      label='Tehty työ'
      required
      control={
        !isLoading &&
        workTypes && (
          <CustomizableSelector
            options={workTypes.map(t => t.label).sort((a, b) => (a == 'Muu' ? 1 : 0))}
            name='maintenance_type'
            value={payload?.maintenance_type}
            onChange={e => resetPayload({ maintenance_type: e.target.value })}
            breakpointValue='Muu'
            placeholder='Kirjoita tehty työ...'
          />
        )
      }
    />
  ) : eventData.target_type != undefined ? (
    <Notification
      variant='error'
      position='start'>
      Työtyyppien lataus epäonnistui!
    </Notification>
  ) : (
    <Notification position='start'>Aloita valitsemalla kohde.</Notification>
  );
};
