import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { IconLink } from '@/components/New/Links/IconLink';
import { Card } from '@/components/UI/Card';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import { Edit, History, Image, PushPin } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';

export function EventPreview({
  propertyId,
  events,
}: {
  propertyId: string;
  events: EventDataType[];
}) {
  return (
    <PreviewContentRow<EventDataType>
      icon={<History />}
      headingText='Viimeisimmät tapahtumat'
      itemsToDisplay={3}
      showAllUrl={`/newDashboard/properties/${propertyId}/events`}
      data={events}
      addNewUrl={`/newDashboard/properties/${propertyId}/events/add`}
      PreviewComponent={async ({ item }) => {
        const [mainImageId] = await db('data_mainImages')
          .where({ objectId: item.id })
          .pluck('imageId');

        return (
          <Link
            href={`/newDashboard/properties/${propertyId}/events/${item.id}`}
            className='hover:no-underline'>
            <Card
              title={item.title}
              description={item.description || 'Ei Kuvausta.'}
              imageSrc={(mainImageId && `/api/files/${mainImageId}`) || '/img/kitchen.jpg'}
              HeaderComponent={() => {
                return (
                  <>
                    <IconLink
                      title='Muokkaa tietoja'
                      href={`/newDashboard/properties/${propertyId}/events/${item.id}/edit`}
                      icon={<Edit />}
                    />
                    <IconLink
                      title='Näytä vaiheet'
                      href={`/newDashboard/properties/${propertyId}/events/${item.id}/steps`}
                      icon={<PushPin />}
                    />
                    <IconLink
                      title='Näytä tiedostot'
                      href={`/newDashboard/properties/${propertyId}/events/${item.id}/files`}
                      icon={<Image />}
                    />
                  </>
                );
              }}
            />
          </Link>
        );
      }}
      onEmptyElement={<span className='text-slate-500'>Ei Tapahtumia.</span>}
    />
  );
}
