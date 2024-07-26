import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Edit } from '@mui/icons-material';
import { getUserAppartments } from 'kotilogi-app/models/appartmentData';
import { getUserHouses } from 'kotilogi-app/models/houseData';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { PropertyOverview } from './[propertyId]/_components/PropertyOverview';

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
        addButtonUrl='/newDashboard/properties/add'
        getOverviewBoxUrl={itemId => `/newDashboard/properties/${itemId}`}
        getOverviewBoxTitle={(item, i) => {
          return (
            item.streetAddress + ' ' + (('appartmentNumber' in item && item.appartmentNumber) || '')
          );
        }}
        getOverviewBoxDeleteUrl={itemId => `/newDashboard/properties/${itemId}/delete`}
        OverviewComponent={async ({ item }) => {
          return (
            <PropertyOverview
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
