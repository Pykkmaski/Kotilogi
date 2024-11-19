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

export default async function EventPage({ params }) {
  const eventId = params.eventId;

  //Fetch data back-to-back to conserve db connection pool.
  const [eventData] = await events.get({ id: eventId });
  if (!eventData) redirect(`/dashboard/properties/${params.propertyId}/events`);
  const [extraData] = await events.getExtraData(eventId);

  const [{ numSteps }] = (await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ parentId: eventId })
    .count('*', { as: 'numSteps' })) as [{ numSteps: number }];

  const fileData = (await files.get({ parentId: eventId }, 4)) as FileDataType[];
  const [mainImageId] = (await db('data_mainImages')
    .where({ objectId: eventId })
    .pluck('imageId')) as [string];

  const DataField = ({ label, value }) => (
    <div className='flex flex-col'>
      <label className='text-slate-500'>{label}</label>
      <span className='font-semibold'>{value}</span>
    </div>
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
    console.log(extraData);

    if (mainTypeLabel === 'Peruskorjaus') {
      if (targetLabel === 'Lämmitysmuoto') {
        return (
          <>
            <div className='flex flex-col gap-4'>
              <DataField
                label='Vanha järjestelmä'
                value={extraData.oldSystemLabel}
              />
              <DataField
                label='Uusi järjestelmä'
                value={extraData.newSystemLabel}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <DataField
                label={getHeatingSystemNamePrefix() + ' ' + 'merkki'}
                value={extraData.newSystemBrandLabel || 'Ei määritelty'}
              />

              <DataField
                label={getHeatingSystemNamePrefix() + ' ' + 'malli'}
                value={extraData.newSystemModelLabel || 'Ei määritelty'}
              />
            </div>
          </>
        );
      } else if (targetLabel === 'Katto') {
        return null;
      }
    }
    return null;
  };

  return (
    <Main>
      <SecondaryHeading>Tapahtuma</SecondaryHeading>
      <EventDocument
        title={eventData.title}
        description={eventData.description || 'Ei kuvausta.'}
        date={eventData.date}>
        <div className='flex lg:flex-row xs:flex-col w-full h-full'>
          <div className='flex flex-col gap-4 w-full'>{getDataContent()}</div>
          {fileData.length ? (
            <div className='grid grid-cols-4 w-full gap-2'>
              {fileData.map(f => (
                <FileCard
                  file={f}
                  isMain={f.id == mainImageId}
                />
              ))}
            </div>
          ) : (
            <div className='flex w-full h-full items-center justify-center'>
              <span>Ei tiedostoja</span>
            </div>
          )}
        </div>
      </EventDocument>
    </Main>
  );
}
