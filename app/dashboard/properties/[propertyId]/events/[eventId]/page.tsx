import { Main } from '@/components/New/Main';
import { FileCard } from '@/components/New/FileCard';
import { BoxFieldset } from '@/components/UI/Fieldset';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { Add, Visibility } from '@mui/icons-material';
import { events } from 'kotilogi-app/dataAccess/events';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { SelectImageDialog } from '@/components/Feature/SelectImageDialog/SelectImageDialog';
import { DialogPrefab } from '@/components/UI/VPDialog';
import db from 'kotilogi-app/dbconfig';

export default async function EventPage({ params }) {
  const eventId = params.eventId;
  const [event] = await events.get({
    id: eventId,
  });

  const files = await db('data_files')
    .join(db.raw('object on object.id = data_files.id'))
    .where({ 'object.parentId': eventId });

  const [mainImageId] = await db('data_mainImages').where({ objectId: eventId }).pluck('imageId');

  return (
    <Main>
      <BoxFieldset legend='Tapahtuman tiedot'>
        <div className='flex lg:flex-row xs:flex-col-reverse xs:gap-4 lg:gap-0 justify-between w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <h1 className='md:text-xl xs:text-lg font-semibold'>{event.title || 'Ei Otsikkoa'}</h1>
            <p className='mb-8'>{event.description || 'Ei kuvausta.'}</p>
            <h1 className='font-semibold text-slate-500'>Tiedot</h1>
            <DataDisplay
              title='Työkulut'
              value={event.labour_expenses}
            />
            <DataDisplay
              title='Materiaalikulut'
              value={event.material_expenses}
            />

            <DataDisplay
              title='Päiväys'
              value={event.date?.toLocaleDateString('fi')}
            />
          </div>
          <div
            className='w-full flex items-center justify-center'
            id='overview-box-image-container'>
            <DialogPrefab
              trigger={
                <img
                  src={mainImageId ? `/api/protected/files/${mainImageId}` : '/img/kitchen.jpg'}
                  loading='lazy'
                  title='Valitse pääkuva'
                  className='rounded-full aspect-square object-center md:w-[50%] xs:w-full cursor-pointer'
                />
              }
              target={<SelectImageDialog images={[]} />}
            />
          </div>
        </div>
      </BoxFieldset>

      <BoxFieldset
        legend={
          <div className='w-full flex items-center gap-4 xs:justify-between lg:justify-start'>
            <span>Tiedostot ja kuvat</span>

            <div className='flex items-center'>
              <Link
                href={`/dashboard/files?parentId=${eventId}&returnUrl=/dashboard/properties/${params.propertyId}/events/${eventId}`}>
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </Link>

              <Link
                href={`/dashboard/files/add?parentId=${eventId}`}
                title='Lisää uusi tiedosto'>
                <IconButton size='small'>
                  <Add />
                </IconButton>
              </Link>
            </div>
          </div>
        }>
        <div className='flex gap-2 wrap w-full'>
          {files.length
            ? files.map(file => (
                <FileCard
                  file={file}
                  isMain={file.id == mainImageId}
                />
              ))
            : 'Ei tiedostoja.'}
        </div>
      </BoxFieldset>
    </Main>
  );
}
