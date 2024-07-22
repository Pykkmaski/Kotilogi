import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { Main } from '@/components/New/Main';
import { Spacer } from '@/components/New/Spacers';
import { MainHeading, TertiaryHeading } from '@/components/New/Typography/Headings';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Card } from '@/components/UI/Card';
import { Dvr, Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';

export default async function EventPage({ params }) {
  const [event] = await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
    .where({ 'propertyEventData.id': params.eventId });

  return (
    <Main>
      <MainHeading>Tapahtuma</MainHeading>
      <OverviewBox
        title={event.title}
        description={
          <div className='flex flex-col gap-2 h-full'>
            <Paragraph>{event.description}</Paragraph>
            <div className='flex flex-col gap-2 mt-auto'>
              <div className='flex gap-4 items-baseline'>
                <TertiaryHeading>Aloitettu: </TertiaryHeading>
                <span>{new Date(event.startTime).toLocaleDateString('fi')}</span>
              </div>

              <div className='flex gap-4 items-baseline'>
                <TertiaryHeading>Valmistunut: </TertiaryHeading>
                <span>{event.endTime || 'Ei vielä valmistunut...'}</span>
              </div>
            </div>
          </div>
        }
        imageUrl='/img/Properties/default-bg.jpg'
        editUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/edit`}
        editContentText='Muokkaa'
        editIcon={<Edit />}
      />

      <PreviewContentRow
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

      <PreviewContentRow
        preview
        data={[]}
        headingText='Kuvat ja tiedostot'
        addNewUrl={`/newDashboard/properties/${params.propertyId}/events/${event.id}/files/add`}
        itemsToDisplay={3}
        PreviewComponent={({ item }) => {
          return null;
        }}
      />
    </Main>
  );
}