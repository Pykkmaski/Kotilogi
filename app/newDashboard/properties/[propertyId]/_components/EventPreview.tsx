import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { IconLink } from '@/components/New/Links/IconLink';
import { Card } from '@/components/UI/Card';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import { Edit, History, Image, PushPin } from '@mui/icons-material';

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
      PreviewComponent={({ item }) => {
        return (
          <Link
            href={`/newDashboard/properties/${propertyId}/events/${item.id}`}
            className='hover:no-underline'>
            <Card
              title={item.title}
              description={item.description || 'Ei Kuvausta.'}
              imageSrc='/img/kitchen.jpg'
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
