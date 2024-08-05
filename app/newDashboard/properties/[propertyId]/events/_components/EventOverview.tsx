import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';

type EventOverviewProps<T extends EventDataType> = {
  event: T & { numSteps: number };
};

export async function EventOverview<T extends EventDataType>({ event }: EventOverviewProps<T>) {
  const [mainImageId] = await db('data_mainImages').where({ objectId: event.id }).pluck('imageId');

  return (
    <OverviewBox
      deleteUrl={`events/${event.id}/delete`}
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
              value={
                (event.endTime &&
                  new Date(parseInt(event.endTime.toString())).toLocaleDateString('fi')) ||
                'Ei vielä valmistunut.'
              }
            />
          </div>
        </div>
      }
      imageUrl={(mainImageId && `/api/files/${mainImageId}`) || '/img/kitchen.jpg'}
      editUrl={`/newDashboard/properties/${event.parentId}/events/${event.id}/edit`}
      showUrl={`/newDashboard/properties/${event.parentId}/events/${event.id}`}
      editContentText='Muokkaa'
      editIcon={<Edit />}
    />
  );
}
