import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { LabelGrid } from '@/components/New/LabelGrid';
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
  console.log(event.startTime, event.endTime);
  const startTime =
    (event.startTime &&
      new Date(
        typeof event.startTime == 'string' ? parseInt(event.startTime) : event.startTime
      ).toLocaleDateString('fi')) ||
    'Ei määritetty';

  const endTime =
    (event.endTime &&
      new Date(
        typeof event.endTime == 'string' ? parseInt(event.endTime) : event.endTime
      ).toLocaleDateString('fi')) ||
    'Ei määritelty';

  return (
    <OverviewBox
      deleteUrl={`events/${event.id}/delete`}
      title={event.title}
      description={
        <div className='flex flex-col gap-4 h-full'>
          <Paragraph>{event.description}</Paragraph>
          <LabelGrid header={<h1 className='text-sm font-semibold'>Tiedot</h1>}>
            <LabelGrid.Entry
              label='Aloitettu'
              value={startTime}
            />
            <LabelGrid.Entry
              label='Valmistunut'
              value={endTime}
            />
          </LabelGrid>
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
