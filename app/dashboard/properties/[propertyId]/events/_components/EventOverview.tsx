import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Delete } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import {
  Chip,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Spacer } from '@/components/UI/Spacer';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { DialogPrefab, VPDialog } from '@/components/UI/VPDialog';
import { SelectImageDialog } from '@/components/Feature/SelectImageDialog/SelectImageDialog';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import Link from 'next/link';
import { EventDeleteButton } from './EventDeleteButton';
import { EventDeleteCancelButton } from './EventDeleteCancelButton';

type EventOverviewProps<T extends EventDataType> = {
  event: T;
};

export async function EventOverview<T extends EventDataType>({ event }: EventOverviewProps<T>) {
  const [{ imageCount }] = await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId: event.id })
    .count('*', { as: 'imageCount' });

  const images = await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId: event.id, type: 'image/jpeg' })
    .select('data_files.id as id', 'data_objects.parentId as parentId');

  const [mainImageId] = await db('data_mainImages').where({ objectId: event.id }).pluck('imageId');
  const editUrl = `/dashboard/properties/${event.parentId}/events/${event.id}/edit`;
  const deleteUrl = `/dashboard/properties/${event.parentId}/events/${event.id}/delete`;

  return (
    <ContentBox>
      <Spacer
        full
        gap='large'
        dir='row'>
        {images.length > 0 ? (
          <DialogPrefab
            target={<SelectImageDialog images={images} />}
            trigger={
              <OverviewImage
                src={
                  (mainImageId && `/api/protected/files/${mainImageId}`) ||
                  '/img/Properties/default-bg.jpg'
                }
              />
            }
          />
        ) : (
          <OverviewImage
            src={
              (mainImageId && `/api/protected/files/${mainImageId}`) ||
              '/img/Properties/default-bg.jpg'
            }
          />
        )}

        <div className='flex flex-col w-full gap-2'>
          <Spacer
            dir='row'
            justify='between'
            items='center'
            grow
            full>
            <Link href={`/dashboard/properties/${event.parentId}/events/${event.id}`}>
              <SecondaryHeading>{event.title}</SecondaryHeading>
            </Link>

            <Spacer
              dir='row'
              gap='small'>
              <DialogPrefab
                trigger={
                  <IconButton color='warning'>
                    <Delete />
                  </IconButton>
                }
                target={
                  <VPDialog>
                    <DialogTitle>Poista tapahtuma</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Olet poistamassa tapahtumaa {event.title}. Oletko varma?
                      </DialogContentText>
                      <DialogActions>
                        <EventDeleteCancelButton />
                        <EventDeleteButton id={event.id} />
                      </DialogActions>
                    </DialogContent>
                  </VPDialog>
                }
              />
            </Spacer>
          </Spacer>

          <Spacer
            dir='col'
            gap={'medium'}
            full>
            <Paragraph>{event.description || 'Ei kuvausta.'}</Paragraph>
            <Spacer
              dir='row'
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
        </div>
      </Spacer>
    </ContentBox>
  );
}
