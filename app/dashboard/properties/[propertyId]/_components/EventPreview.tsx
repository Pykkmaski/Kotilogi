import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { Card } from '@/components/UI/Card';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import Link from 'next/link';
import { History, MoreVert } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { Menu } from '@/components/New/Menu';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { getEvents } from 'kotilogi-app/dataAccess/events/getEvents';

export async function EventPreview({ propertyId }: { propertyId: string }) {
  const events = await getEvents({ parentId: propertyId }, null, 4);

  return (
    <PreviewContentRow<EventDataType>
      icon={<History />}
      headingText='Viimeisimmät tapahtumat'
      itemsToDisplay={3}
      showAllUrl={`/dashboard/properties/${propertyId}/events`}
      data={events}
      addNewUrl={`/dashboard/properties/${propertyId}/events/add`}
      PreviewComponent={async ({ item }) => {
        const [mainImageId] = await db('data_mainImages')
          .where({ objectId: item.id })
          .pluck('imageId');

        const imageSrc =
          (mainImageId && `/api/protected/files/${mainImageId}`) || '/img/kitchen.jpg';

        return (
          <>
            <div className='xs:hidden md:block'>
              <Card
                href={`${propertyId}/events/${item.id}`}
                title={item.title}
                description={item.description || 'Ei Kuvausta.'}
                imageSrc={imageSrc}
                HeaderComponent={() => {
                  return (
                    <>
                      <Menu trigger={<MoreVert sx={{ color: 'white' }} />}>
                        <Link
                          title='Muokkaa tietoja'
                          href={`/dashboard/properties/${propertyId}/events/${item.id}/edit`}>
                          Muokkaa
                        </Link>

                        <Link
                          title='Näytä tiedostot'
                          href={`/dashboard/properties/${propertyId}/events/${item.id}/files`}>
                          Tiedostot
                        </Link>
                        <Link href={`${propertyId}/events/${item.id}/delete`}>Poista</Link>
                      </Menu>
                    </>
                  );
                }}
              />
            </div>
            <div className='xs:block md:hidden w-full'>
              <Link href={`${propertyId}/events/${item.id}`}>
                <ContentBox>
                  <div className='h-full w-full flex gap-2 items-center'>
                    <div className='flex flex-col text-sm'>
                      <h1 className='font-semibold'>{item.title}</h1>
                      <p>{item.description || 'Ei kuvausta.'}</p>
                    </div>
                  </div>
                </ContentBox>
              </Link>
            </div>
          </>
        );
      }}
      onEmptyElement={<span className='text-slate-500'>Ei Tapahtumia.</span>}
    />
  );
}
