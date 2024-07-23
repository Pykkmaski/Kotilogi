import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { ChipData } from '@/components/New/ChipData';
import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { Spacer } from '@/components/New/Spacers';
import { MainHeading, TertiaryHeading } from '@/components/New/Typography/Headings';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Card } from '@/components/UI/Card';
import { Dvr, Edit, Image, Pin, PushPin, Tag } from '@mui/icons-material';
import { Chip } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import { EventOverview } from '../_components/EventOverview';

export default async function EventPage({ params }) {
  const [event] = await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
    .where({ 'propertyEventData.id': params.eventId });

  return (
    <Main>
      <MainHeading>Tapahtuma</MainHeading>
      <EventOverview event={event} />

      <PreviewContentRow
        icon={<PushPin />}
        preview
        previewDescription='Vaiheita voidaan sanoa tapahtumien sisällä oleviin tapahtumiin, joiden avulla koko tapahtuman kulkua voidaan seurata.'
        data={[]}
        headingText='Vaiheet'
        itemsToDisplay={3}
        showAllUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/moments`}
        addNewUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/moments/add`}
        PreviewComponent={({ item }) => {
          return (
            <Card
              title={item.title}
              description={item.description}
            />
          );
        }}
      />

      <FileOverview
        preview
        files={[]}
        addNewUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/files/add`}
        PreviewComponent={({ item }) => {
          return null;
        }}
      />
    </Main>
  );
}
