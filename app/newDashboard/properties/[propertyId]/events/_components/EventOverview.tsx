import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import { EventDataType } from 'kotilogi-app/models/types';

type EventOverviewProps = {
  event: EventDataType;
};

export function EventOverview({ event }: EventOverviewProps) {
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
              chipColor='primary'
              label='Valmistunut'
              value={event.endTime || 'Ei vielä valmistunut.'}
            />
          </div>
        </div>
      }
      imageUrl='/img/Properties/default-bg.jpg'
      editUrl={`/newDashboard/properties/${event.parentId}/events/${event.id}/edit`}
      editContentText='Muokkaa'
      editIcon={<Edit />}
    />
  );
}
