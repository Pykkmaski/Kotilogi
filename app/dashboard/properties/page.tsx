import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Edit } from '@mui/icons-material';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { PropertyOverview } from './[propertyId]/_components/PropertyOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import db from 'kotilogi-app/dbconfig';

import { getPropertiesOfUser } from 'kotilogi-app/dataAccess/properties';
import { redirect } from 'next/navigation';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export default async function PropertiesPage() {
  const session = await verifySession();

  const properties = (await getPropertiesOfUser(session.user.id)) as (
    | HouseDataType
    | AppartmentDataType
  )[];

  return (
    <Main>
      <OverviewBoxList
        items={properties}
        listTitle='Talot'
        onEmptyElement={
          <GalleryError
            title='Ei taloja'
            message='Et ole vielä lisännyt taloja.'
            icon={'fa fa-home'}
          />
        }
        addButtonUrl='/dashboard/properties/add'
        OverviewComponent={async ({ item }) => {
          const owners = await db('data_propertyOwners').where({ propertyId: item.id });
          return (
            <PropertyOverview
              owners={owners}
              property={item}
              editUrl={`/dashboard/properties/${item.id}/edit`}
              showUrl={`/dashboard/properties/${item.id}`}
              editContentText='Muokkaa'
              editIcon={<Edit />}
            />
          );
        }}
      />
    </Main>
  );
}
