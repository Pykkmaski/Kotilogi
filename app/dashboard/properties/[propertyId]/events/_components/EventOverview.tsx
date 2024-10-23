import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { LabelGrid } from '@/components/New/LabelGrid';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { Chip } from '@mui/material';
import { Spacer } from '@/components/UI/Spacer';
import { deleteEventAction } from '../[eventId]/delete/_components/actions';

type EventOverviewProps<T extends EventDataType> = {
  event: T;
};

export async function EventOverview<T extends EventDataType>({ event }: EventOverviewProps<T>) {
  const [mainImageId] = await db('data_mainImages').where({ objectId: event.id }).pluck('imageId');
  const editUrl = `/dashboard/properties/${event.parentId}/events/${event.id}/edit`;
  const deleteUrl = `/dashboard/properties/${event.parentId}/events/${event.id}/delete`;

  return (
    <OverviewBox
      deleteAction={async () => {
        'use server';
        await deleteEventAction(event.id);
      }}
      title={event.title}
      description={
        <Spacer
          direction='col'
          gap={'medium'}
          height='full'>
          <Paragraph>{event.description || 'Ei kuvausta.'}</Paragraph>
          <Spacer
            direction='row'
            gap={'small'}>
            <Chip
              label={event.mainTypeLabel || 'Muu'}
              color='secondary'
            />

            {event.targetLabel && <Chip label={event.targetLabel} />}
            {event.workTypeLabel && <Chip label={event.workTypeLabel} />}
          </Spacer>

          <LabelGrid header={<h1 className='text-sm font-semibold'>Tiedot</h1>}>
            <LabelGrid.Entry
              label='Päiväys'
              value={event.date.toLocaleDateString()}
            />
          </LabelGrid>
        </Spacer>
      }
      imageUrl={(mainImageId && `/api/protected/files/${mainImageId}`) || '/img/kitchen.jpg'}
      showUrl={`/dashboard/properties/${event.parentId}/events/${event.id}`}
      editContentText='Muokkaa'
      editIcon={<Edit />}
    />
  );
}
