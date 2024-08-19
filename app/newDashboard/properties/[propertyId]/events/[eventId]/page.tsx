import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { ChipData } from '@/components/New/ChipData';
import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { Spacer } from '@/components/New/Spacers';
import {
  MainHeading,
  SecondaryHeading,
  TertiaryHeading,
} from '@/components/New/Typography/Headings';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Card } from '@/components/UI/Card';
import { Dvr, Edit, Image, Pin, PushPin, Tag } from '@mui/icons-material';
import { Chip } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import { EventOverview } from '../_components/EventOverview';
import { EventDataType, EventStepDataType, FileDataType } from 'kotilogi-app/models/types';
import { FileCard } from '@/components/New/FileCard';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { IconLink } from '@/components/New/Links/IconLink';
import { getFiles } from 'kotilogi-app/models/fileData';

export default async function EventPage({ params }) {
  const eventId = params.eventId;

  //Fetch data back-to-back to conserve db connection pool.
  const [event] = (await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': eventId })) as [EventDataType];

  const steps = (await db('data_objects')
    .join('data_propertyEventSteps', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ parentId: eventId })
    .limit(4)) as EventStepDataType[];

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
        addNewUrl={`/newDashboard/files/add?parentId=${eventId}`}
        showAllUrl={`/newDashboard/properties/${params.propertyId}/events/${eventId}/files`}
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
