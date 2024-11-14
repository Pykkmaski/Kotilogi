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

  return (
    <Main>
      <SecondaryHeading>Tapahtuma</SecondaryHeading>
      <EventOverview
        event={{
          ...eventData,
          numSteps,
        }}
      />

      <div className='flex md:gap-4 xs:gap-1 xs:flex-col lg:flex-row'>
        <div className='xs:w-full lg:w-[50%]'>
          <EventDetails
            eventData={eventData}
            extraData={extraData}
          />
        </div>

        <div className='xs:w-full lg:w-[50%]'>
          <FileOverview
            files={fileData}
            addNewUrl={`/dashboard/files/add?parentId=${eventId}`}
            showAllUrl={`/dashboard/files?parentId=${eventId}&returnUrl=/dashboard/properties/${params.propertyId}/events/${eventId}`}
            PreviewComponent={({ item }) => {
              return (
                <FileCard
                  file={item}
                  isMain={item.id == mainImageId}
                />
              );
            }}
          />
        </div>
      </div>
    </Main>
  );
}
