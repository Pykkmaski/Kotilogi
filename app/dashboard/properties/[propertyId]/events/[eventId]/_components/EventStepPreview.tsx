import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { Card } from '@/components/UI/Card';
import { PushPin } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventStepDataType } from 'kotilogi-app/dataAccess/types';

export function EventStepPreview({
  steps,
  propertyId,
  eventId,
}: {
  steps: EventStepDataType[];
  propertyId: string;
  eventId: string;
}) {
  return (
    <PreviewContentRow
      icon={<PushPin />}
      previewDescription='Vaiheita voidaan sanoa tapahtumien sisällä oleviin tapahtumiin, joiden avulla koko tapahtuman kulkua voidaan seurata.'
      data={steps}
      headingText='Vaiheet'
      itemsToDisplay={3}
      showAllUrl={`/newDashboard/properties/${propertyId}/events/${eventId}/steps`}
      addNewUrl={`/newDashboard/properties/${propertyId}/events/${eventId}/steps/add`}
      onEmptyElement={<span className='text-slate-500'>Tapahtumalla ei ole vielä vaiheita.</span>}
      PreviewComponent={async ({ item }) => {
        const [mainImageId] = await db('data_mainImages')
          .where({ objectId: item.id })
          .pluck('imageId');

        return (
          <Card
            href={`${eventId}/steps/${item.id}`}
            imageSrc={(mainImageId && `/api/files/${mainImageId}`) || '/img/room.jpg'}
            title={item.title}
            description={item.description || 'Ei kuvausta.'}
          />
        );
      }}
    />
  );
}
