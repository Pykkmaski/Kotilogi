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

export default async function PropertiesPage() {
  const session = await loadSession();
  const houses = await getUserHouses(session.user.id);
  const appartments = await getUserAppartments(session.user.id);
  const properties = [...houses, ...appartments] as (HouseDataType | AppartmentDataType)[];

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
          const [{ numEvents }] = await db('data_objects')
            .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
            .where({ parentId: item.id })
            .count('*', { as: 'numEvents' });

          return (
            <PropertyOverview
              numEvents={numEvents}
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
