'use client';

import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEventTargets } from '../actions';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { Notification } from '@/components/UI/Notification';
import { ChipBox } from '@/components/UI/ChipBox';

import { icons } from 'kotilogi-app/icons';
import { MoreHoriz } from '@mui/icons-material';
import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useMemo } from 'react';

function EventTargetGroup({ options }) {
  const { eventData, updateEventData } = useEventFormContext();
  const opts = useMemo(() => {
    return putOtherOptionLast(options).map((opt, key) => {
      const selected = opt.id == eventData.target_id;
      const iconStyle = {
        color: selected ? 'white' : 'gray',
      };

      const Icon = icons[opt.label] || MoreHoriz;

      return (
        <ChipBox
          key={`event-target-${key}`}
          icon={<Icon sx={iconStyle} />}
          value={opt.id}
          label={opt.label}
          name='target_id'
          onChange={updateEventData}
          checked={selected}
        />
      );
    });
  }, [options, eventData, updateEventData, icons]);

  return <div className='grid lg:grid-cols-4 xs:grid-cols-2 gap-2 w-full'>{opts}</div>;
}

export const EventTargetSelector = () => {
  const { eventData } = useEventFormContext();

  const {
    isLoading,
    data: targets,
    error,
  } = useQuery({
    queryKey: [`targets-${eventData.event_type_id}`],
    queryFn: async () => await getEventTargets(eventData.event_type_id),
  });

  return !error ? (
    <SuspenseFormControl
      label='Kohde'
      required
      isLoading={isLoading}
      control={<div className='w-full'>{!isLoading && <EventTargetGroup options={targets} />}</div>}
    />
  ) : (
    <Notification
      variant='error'
      position='start'>
      Kohteiden lataus epäonnistui!
    </Notification>
  );
};
