import { Main } from '@/components/New/Main';
import { getProperty } from 'kotilogi-app/models/propertyData';
import { PropertyForm } from '../../add/_components/PropertyForm';

export default async function EditPropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);

  return (
    <Main>
      <PropertyForm property={property} />
    </Main>
  );
}
