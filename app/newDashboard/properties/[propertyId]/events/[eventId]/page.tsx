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
import { EventStepDataType } from 'kotilogi-app/models/types';

export default async function EventPage({ params }) {
  const [event] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': params.eventId });

  const steps = (await db('data_objects')
    .join('data_propertyEventSteps', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ parentId: event.id })) as EventStepDataType[];

  return (
    <Main>
      <MainHeading>Tapahtuma</MainHeading>
      <EventOverview event={event} />

      <PreviewContentRow
        icon={<PushPin />}
        previewDescription='Vaiheita voidaan sanoa tapahtumien sisällä oleviin tapahtumiin, joiden avulla koko tapahtuman kulkua voidaan seurata.'
        data={steps}
        headingText='Vaiheet'
        itemsToDisplay={3}
        showAllUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/moments`}
        addNewUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/moments/add`}
        onEmptyElement={<span className='text-slate-500'>Tapahtumalla ei ole vielä vaiheita.</span>}
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
