import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { Visibility } from '@mui/icons-material';
import { getUserAppartments } from 'kotilogi-app/models/appartmentData';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { getUserHouses } from 'kotilogi-app/models/houseData';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import Link from 'next/link';

export default async function PropertiesPage() {
  const session = await loadSession();
  const houses = await getUserHouses(session.user.id);
  const appartments = await getUserAppartments(session.user.id);
  const properties = [...houses, ...appartments];

  return (
    <Main>
      {properties.map((property, i) => (
        <NoUnderlineLink href={`/newDashboard/properties/${property.id}`}>
          <OverviewBox
            key={`property-${i}`}
            title={property.streetAddress + ' ' + (property.appartmentNumber || '')}
            description={property.description || 'Ei Kuvausta.'}
            imageUrl='/img/Properties/default-bg.jpg'
          />
        </NoUnderlineLink>
      ))}
    </Main>
  );
}
