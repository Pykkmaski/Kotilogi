import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import db from 'kotilogi-app/dbconfig';
import { EventOverview } from '../_components/EventOverview';
import { FileDataType } from 'kotilogi-app/dataAccess/types';
import { FileCard } from '@/components/New/FileCard';
import { getFiles } from 'kotilogi-app/dataAccess/fileData';
import { getEvents } from 'kotilogi-app/dataAccess/events/getEvents';
import { getExtraEventData } from 'kotilogi-app/dataAccess/events/getExtraEventData';

export default async function EventPage({ params }) {
  const eventId = params.eventId;

  //Fetch data back-to-back to conserve db connection pool.
  const [event] = await getEvents({ id: eventId });
  const extraData = await getExtraEventData(eventId);

  console.log(event.date);
  const [{ numSteps }] = (await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ parentId: eventId })
    .count('*', { as: 'numSteps' })) as [{ numSteps: number }];

  const files = (await getFiles({ parentId: eventId }, 4)) as FileDataType[];
  const [mainImageId] = (await db('data_mainImages')
    .where({ objectId: eventId })
    .pluck('imageId')) as [string];

  return (
    <Main>
      <SecondaryHeading>Tapahtuma</SecondaryHeading>
      <EventOverview
        event={{
          ...event,
          numSteps,
        }}
      />

      <FileOverview
        files={files}
        addNewUrl={`/dashboard/files/add?parentId=${eventId}`}
        showAllUrl={`/dashboard/properties/${params.propertyId}/events/${eventId}/files`}
        PreviewComponent={({ item }) => {
          return (
            <FileCard
              file={item}
              isMain={item.id == mainImageId}
            />
          );
        }}
      />
    </Main>
  );
}
