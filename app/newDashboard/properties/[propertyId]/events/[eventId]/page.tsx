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
import { EventStepDataType } from 'kotilogi-app/models/types';
import { FileCard } from '@/components/New/FileCard';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { IconLink } from '@/components/New/Links/IconLink';

export default async function EventPage({ params }) {
  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': params.eventId });

  const steps = (await db('data_objects')
    .join('data_propertyEventSteps', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ parentId: event.id })
    .limit(4)) as EventStepDataType[];

  const [{ numSteps }] = await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ parentId: params.eventId })
    .count('*', { as: 'numSteps' });

  const files = await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId: params.eventId });

  const [mainImageId] = await db('data_mainImages').where({ objectId: event.id }).pluck('imageId');
  return (
    <Main>
      <SecondaryHeading>Tapahtuma</SecondaryHeading>
      <EventOverview
        event={{
          ...event,
          numSteps,
        }}
      />

      <PreviewContentRow
        icon={<PushPin />}
        previewDescription='Vaiheita voidaan sanoa tapahtumien sisällä oleviin tapahtumiin, joiden avulla koko tapahtuman kulkua voidaan seurata.'
        data={steps}
        headingText='Vaiheet'
        itemsToDisplay={3}
        showAllUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/steps`}
        addNewUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/steps/add`}
        onEmptyElement={<span className='text-slate-500'>Tapahtumalla ei ole vielä vaiheita.</span>}
        PreviewComponent={async ({ item }) => {
          const [mainImageId] = await db('data_mainImages')
            .where({ objectId: item.id })
            .pluck('imageId');

          return (
            <NoUnderlineLink href={`${event.id}/steps/${item.id}`}>
              <Card
                imageSrc={(mainImageId && `/api/files/${mainImageId}`) || '/img/room.jpg'}
                title={item.title}
                description={item.description || 'Ei kuvausta.'}
              />
            </NoUnderlineLink>
          );
        }}
      />

      <FileOverview
        files={files}
        addNewUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/files/add`}
        showAllUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/files`}
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
