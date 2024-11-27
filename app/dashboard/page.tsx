import { PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { Main } from '@/components/New/Main';
import { Card } from '@/components/UI/Card';
import { Home } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { PropertyCardHeaderContent } from './_components/PropertyCardHeaderContent';
import { properties } from 'kotilogi-app/dataAccess/properties';

export default async function newDashboardPage() {
  const session = await loadSession();
  const data = await properties.getPropertiesOfUser(session.user.id);

  return (
    <Main>
      <PreviewContentRow<AppartmentDataType | HouseDataType>
        icon={<Home />}
        title='Talot'
        showAllUrl='/dashboard/properties'
        addNewUrl='/dashboard/properties/add'
        itemsToDisplay={3}
        onEmptyElement={<span className='text-slate-500'>Et ole lisännyt taloja.</span>}
        data={data}
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
              HeaderComponent={() => <PropertyCardHeaderContent item={item} />}
            />
          );
        }}
      />
    </Main>
  );
}
