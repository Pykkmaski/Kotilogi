import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import db from 'kotilogi-app/dbconfig';
import { EventOverview } from '../_components/EventOverview';
import { FileDataType } from 'kotilogi-app/dataAccess/types';
import { FileCard } from '@/components/New/FileCard';
import { EventDetails } from './_EventDetails/EventDetails';
import { redirect } from 'next/navigation';
import { events } from 'kotilogi-app/dataAccess/events';
import { files } from 'kotilogi-app/dataAccess/files';
import { EventDocument } from './_EventDetails/EventDocument';
import { ReactNode } from 'react';
import { BoxFieldset } from '@/components/UI/Fieldset';
import { RoofData } from '@/components/UI/EventData/RoofData';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { Add, Visibility } from '@mui/icons-material';

export default async function EventPage({ params }) {
  const eventId = params.eventId;

  //Fetch data back-to-back to conserve db connection pool.
  const [eventData] = await events.get({ id: eventId });
  if (!eventData) redirect(`/dashboard/properties/${params.propertyId}/events`);
  const extraData = {} as any;

  const fileData = (await files.get({ parentId: eventId }, 4)) as FileDataType[];
  const [mainImageId] = (await db('data_mainImages')
    .where({ objectId: eventId })
    .pluck('imageId')) as [string];

  const DataField = ({ label, value }: { label: ReactNode; value: any }) => {
    const getValue = () => {
      if (typeof value === 'boolean') {
        return (value && 'Kyllä') || 'Ei';
      } else {
        return value || 'Ei määritelty';
      }
    };

    return (
      <div className='flex flex-row w-full justify-between'>
        <label className='text-slate-500'>{label}</label>
        <span className='font-semibold'>{getValue() || 'Ei määritelty'}</span>
      </div>
    );
  };

  const DataGroup = ({ children }) => (
    <div className='flex flex-col gap-4 w-full text-base'>{children}</div>
  );

  const getHeatingSystemNamePrefix = () => {
    const label = extraData.newSystemLabel;
    return label == 'Kaukolämpö'
      ? 'Lämmönjakokeskuksen'
      : label === 'Öljy'
      ? 'Öljylämmityskeskuksen'
      : null;
  };

  const getDataContent = () => {
    const { mainTypeLabel, targetLabel } = eventData;

    if (mainTypeLabel === 'Peruskorjaus') {
      if (targetLabel === 'Lämmitysmuoto') {
        return (
          <>
            <DataGroup>
              <DataField
                label='Vanha järjestelmä'
                value={extraData.oldSystemLabel}
              />
              <DataField
                label='Uusi järjestelmä'
                value={extraData.newSystemLabel}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label={getHeatingSystemNamePrefix() + ' ' + 'merkki'}
                value={extraData.newSystemBrandLabel || 'Ei määritelty'}
              />

              <DataField
                label={getHeatingSystemNamePrefix() + ' ' + 'malli'}
                value={extraData.newSystemModelLabel || 'Ei määritelty'}
              />
            </DataGroup>
          </>
        );
      }
    }
    return null;
  };
  const [{ result: eventTargets }] = await db('events.targets').select(
    db.raw('json_object_agg(label, id) as result')
  );

  const [{ result: eventTypes }] = await db('events.types').select(
    db.raw('json_object_agg(id, label) as result')
  );

  //const [mainImageId] = await db('data_mainImages').where({objectId: eventData.id}).pluck('imageId');
  return (
    <Main>
      <BoxFieldset legend='Tapahtuman tiedot'>
        <div className='flex gap-4 w-full'>
          <div className='w-full flex flex-col gap-10'>
            <div className='flex flex-col w-full'>
              <h1 className='md:text-xl xs:text-lg font-semibold'>{eventData.title}</h1>
              <p>{eventData.description || 'Ei kuvausta.'}</p>
            </div>

            <div className='flex flex-col gap-2 w-full'></div>
          </div>

          <div
            className='w-full flex items-center justify-center'
            id='overview-box-image-container'>
            <img
              src={mainImageId ? `/api/protected/files/${mainImageId}` : '/img/kitchen.jpg'}
              loading='lazy'
              className='rounded-full aspect-square object-cover md:w-[50%] xs:w-full'
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
          {fileData.length
            ? fileData.map(file => {
                return (
                  <FileCard
                    file={file}
                    isMain={file.id == mainImageId}
                  />
                );
              })
            : 'Ei tiedostoja.'}
        </div>
      </BoxFieldset>
    </Main>
  );
}
