import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Add, Visibility } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getUserAppartments } from 'kotilogi-app/models/appartmentData';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { getUserHouses } from 'kotilogi-app/models/houseData';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import Link from 'next/link';
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
        OverviewComponent={({ item }) => (
          <PropertyOverview
            property={item}
            editUrl={`/newDashboard/properties/${item.id}`}
            editContentText='Näytä'
            editIcon={<Visibility />}
          />
        )}
      />
    </Main>
  );
}
