import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import { EventDataType } from 'kotilogi-app/models/types';

type EventOverviewProps<T extends EventDataType> = {
  event: T & { numSteps: number };
};

export function EventOverview<T extends EventDataType>({ event }: EventOverviewProps<T>) {
  return (
    <OverviewBox
      deleteUrl={`/newDashboard/properties/${event.parentId}/events/${event.id}/delete`}
      title={event.title}
      description={
        <div className='flex flex-col gap-2 h-full'>
          <Paragraph>{event.description}</Paragraph>
          <div className='flex flex-col gap-2 mt-auto'>
            <ChipData
              label='Aloitettu'
              chipColor='primary'
              value={new Date(parseInt(event.startTime.toString())).toLocaleDateString('fi')}
            />

            <ChipData
              label='Vaiheet'
              value={event.numSteps}
            />

            <ChipData
              chipColor='primary'
              label='Valmistunut'
              value={event.endTime || 'Ei vielä valmistunut.'}
            />
          </div>
        </div>
      }
      imageUrl='/img/kitchen.jpg'
      editUrl={`/newDashboard/properties/${event.parentId}/events/${event.id}/edit`}
      showUrl={`/newDashboard/properties/${event.parentId}/events/${event.id}`}
      editContentText='Muokkaa'
      editIcon={<Edit />}
    />
  );
}
