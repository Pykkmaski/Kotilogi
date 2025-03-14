import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { Delete } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventPayloadType } from '../types/EventPayloadType';
import {
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
import Link from 'next/link';
import { EventDeleteButton } from './EventDeleteButton';
import { EventDeleteCancelButton } from './EventDeleteCancelButton';

type EventOverviewProps<T extends EventPayloadType> = {
  event: T;
};

export async function EventOverview<T extends EventPayloadType>({ event }: EventOverviewProps<T>) {
  const images = await db('data_files')
    .join('object', { 'object.id': 'data_files.id' })
    .where({ 'object.parentId': event.id, type: 'image/jpeg' })
    .select('data_files.id as id', 'object.parentId as parentId');

  const [mainImageId] = await db('data_mainImages').where({ objectId: event.id }).pluck('imageId');

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
          <Link href={`/dashboard/properties/${event.property_id}/events/${event.id}`}>
            <OverviewImage
              src={
                (mainImageId && `/api/protected/files/${mainImageId}`) ||
                '/img/Properties/default-bg.jpg'
              }
            />
          </Link>
        )}

        <div className='flex flex-col w-full gap-2'>
          <Spacer
            dir='row'
            justify='between'
            items='center'
            grow
            full>
            <Link href={`/dashboard/properties/${event.property_id}/events/${event.id}`}>
              <h1 className='xs:text-sm md:text-lg font-semibold'>{event.title}</h1>
            </Link>

            <Spacer
              dir='row'
              gap='small'>
              <DialogPrefab
                trigger={
                  <IconButton
                    color='warning'
                    sx={{ padding: 0 }}>
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
            gap={'small'}
            full>
            <p className='xs:text-sm md:text-lg'>{event.description || 'Ei kuvausta.'}</p>
            <span className='xs:text-sm md:text-lg text-slate-500'>
              {event.date.toLocaleDateString('fi')}
            </span>
          </Spacer>
        </div>
      </Spacer>
    </ContentBox>
  );
}
