import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { IconLink } from '@/components/New/Links/IconLink';
import { Card } from '@/components/UI/Card';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import { Edit, History, Image, PushPin } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { Menu } from '@/components/New/Menu';
import { CardMenuButton } from '@/components/New/CardMenuButton';
import { getEvents } from 'kotilogi-app/models/propertyEventData';

export async function EventPreview({ propertyId }: { propertyId: string }) {
  const events = await getEvents({ parentId: propertyId }, undefined, 4);

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
          <Card
            href={`${propertyId}/events/${item.id}`}
            title={item.title}
            description={item.description || 'Ei Kuvausta.'}
            imageSrc={
              (mainImageId && `/api/protected/files?id=${mainImageId}`) || '/img/kitchen.jpg'
            }
            HeaderComponent={() => {
              return (
                <>
                  <Menu trigger={<CardMenuButton />}>
                    <Link
                      title='Muokkaa tietoja'
                      href={`/newDashboard/properties/${propertyId}/events/${item.id}/edit`}>
                      Muokkaa
                    </Link>

                    <Link
                      title='Näytä tiedostot'
                      href={`/newDashboard/properties/${propertyId}/events/${item.id}/files`}>
                      Tiedostot
                    </Link>
                    <Link href={`${propertyId}/events/${item.id}/delete`}>Poista</Link>
                  </Menu>
                </>
              );
            }}
          />
        );
      }}
      onEmptyElement={<span className='text-slate-500'>Ei Tapahtumia.</span>}
    />
  );
}
