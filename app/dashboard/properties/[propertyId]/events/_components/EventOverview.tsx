import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { LabelGrid } from '@/components/New/LabelGrid';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { Chip } from '@mui/material';
import { Spacer } from '@/components/New/Spacer';

type EventOverviewProps<T extends EventDataType> = {
  event: T;
};

export async function EventOverview<T extends EventDataType>({ event }: EventOverviewProps<T>) {
  const [mainImageId] = await db('data_mainImages').where({ objectId: event.id }).pluck('imageId');

  return (
    <OverviewBox
      deleteUrl={`events/${event.id}/delete`}
      title={event.title}
      description={
        <div className='flex flex-col gap-4 h-full'>
          <Paragraph>{event.description || 'Ei kuvausta.'}</Paragraph>
          <Spacer
            direction='row'
            gap={2}>
            <Chip
              label={event.mainTypeLabel || 'Muu'}
              color='primary'
            />
            <Chip label={event.targetLabel || 'Muu'} />
            <Chip label={event.workTypeLabel || 'Muu'} />
          </Spacer>

          <LabelGrid header={<h1 className='text-sm font-semibold'>Tiedot</h1>}>
            <LabelGrid.Entry
              label='Päiväys'
              value={event.date.toLocaleDateString()}
            />
          </LabelGrid>
        </div>
      }
      imageUrl={(mainImageId && `/api/protected/files/${mainImageId}`) || '/img/kitchen.jpg'}
      editUrl={`/dashboard/properties/${event.parentId}/events/${event.id}/edit`}
      showUrl={`/dashboard/properties/${event.parentId}/events/${event.id}`}
      editContentText='Muokkaa'
      editIcon={<Edit />}
    />
  );
}
