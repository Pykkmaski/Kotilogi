import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Edit, Home } from '@mui/icons-material';
import { getUserAppartments } from 'kotilogi-app/models/appartmentData';
import { getUserHouses } from 'kotilogi-app/models/houseData';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { PropertyOverview } from './[propertyId]/_components/PropertyOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import db from 'kotilogi-app/dbconfig';
import { getUserProperties } from 'kotilogi-app/models/propertyData';

export default async function PropertiesPage() {
  const session = await loadSession();
  const properties = (await getUserProperties(session.user.id)) as (
    | HouseDataType
    | AppartmentDataType
  )[];
  console.log(properties);
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
        addButtonUrl='/newDashboard/properties/add'
        OverviewComponent={async ({ item }) => {
          console.log(item.id);
          const [{ numEvents }] = await db('data_objects')
            .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
            .where({ parentId: item.id })
            .count('*', { as: 'numEvents' });

          const owners = await db('data_propertyOwners').where({ propertyId: item.id });
          return (
            <PropertyOverview
              numEvents={numEvents}
              owners={owners}
              property={item}
              editUrl={`/newDashboard/properties/${item.id}/edit`}
              showUrl={`/newDashboard/properties/${item.id}`}
              editContentText='Muokkaa'
              editIcon={<Edit />}
            />
          );
        }}
      />
    </Main>
  );
}
