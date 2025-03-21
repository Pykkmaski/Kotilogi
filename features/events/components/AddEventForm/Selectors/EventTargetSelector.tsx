'use client';

import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEventTargets } from '../../../actions/actions';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { Notification } from '@/components/UI/Notification';
import { ChipBox } from '@/components/UI/ChipBox';

import { icons } from 'kotilogi-app/icons';
import { MoreHoriz } from '@mui/icons-material';
import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useMemo } from 'react';
import { EventType } from 'kotilogi-app/types/EventType';
import {
  getCosmeticTargetTypes,
  getRestorableTargetTypes,
  getServiceableTargetTypes,
  TargetType,
} from 'kotilogi-app/types/TargetType';
import { FormControl } from '@/components/UI/FormUtils';
import { getTargetsByEventType } from '../utils/getTargetsByEventType';

function EventTargetGroup({ options }) {
  const { eventData, updateEventTarget } = useEventFormContext();
  const opts = useMemo(() => {
    return putOtherOptionLast(options).map((opt, key) => {
      const selected = opt.id == eventData.target_type;
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
          name='target_type'
          onChange={updateEventTarget}
          checked={selected}
        />
      );
    });
  }, [options, eventData, updateEventTarget, icons]);

  return <div className='grid lg:grid-cols-3 xs:grid-cols-2 gap-2 w-full'>{opts}</div>;
}

export const EventTargetSelector = () => {
  const {
    eventData: { event_type },
  } = useEventFormContext();
  const targets = getTargetsByEventType(event_type);
  return (
    <FormControl
      label='Kohde'
      required
      control={
        <div className='w-full'>
          <EventTargetGroup options={targets.map(t => ({ id: t, label: t }))} />
        </div>
      }
    />
  );
};
