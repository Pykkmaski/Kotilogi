import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { Main } from '@/components/New/Main';
import { Menu } from '@/components/New/Menu';
import { Card } from '@/components/UI/Card';
import { Home } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { getUserProperties } from 'kotilogi-app/models/propertyData';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import Link from 'next/link';
import { CardMenuButton } from '@/components/New/CardMenuButton';

export default async function newDashboardPage() {
  const session = await loadSession();
  const properties = await getUserProperties(session.user.id);
  console.log('Properties on dashboardPage: ', properties);
  return (
    <Main>
      <PreviewContentRow<AppartmentDataType | HouseDataType>
        icon={<Home />}
        headingText='Talot'
        showAllUrl='/dashboard/properties'
        addNewUrl='/dashboard/properties/add'
        itemsToDisplay={3}
        onEmptyElement={<span className='text-slate-500'>Et ole lisännyt taloja.</span>}
        data={properties}
        PreviewComponent={async ({ item }) => {
          const [mainImageId] =
            (await db('data_mainImages').where({ objectId: item.id }).pluck('imageId')) || [];

          return (
            <Card
              href={`dashboard/properties/${item.id}`}
              title={`${item.streetAddress} ${
                'appartmentNumber' in item ? item.appartmentNumber : ''
              }`}
              description={item.description || 'Ei Kuvausta.'}
              imageSrc={
                (mainImageId && `/api/protected/files/${mainImageId}`) ||
                '/img/Properties/default-bg.jpg'
              }
              HeaderComponent={() => {
                return (
                  <>
                    <Menu trigger={<CardMenuButton />}>
                      <Link href={`/dashboard/properties/${item.id}/edit`}>Muokkaa</Link>
                      <Link
                        href={`/dashboard/properties/${item.id}/events`}
                        title='Näytä tapahtumat'>
                        Tapahtumat
                      </Link>
                      <Link
                        href={`/dashboard/properties/${item.id}/files`}
                        title='Näytä tiedostot'>
                        Tiedostot
                      </Link>
                      <Link
                        href={`/dashboard/properties/${item.id}/utility`}
                        title='Näytä kulutustiedot'>
                        Kulutustiedot
                      </Link>
                      <Link
                        title='Poista talo...'
                        href={`/dashboard/properties/${item.id}/delete`}>
                        Poista
                      </Link>
                    </Menu>
                  </>
                );
              }}
            />
          );
        }}
      />
    </Main>
  );
}
