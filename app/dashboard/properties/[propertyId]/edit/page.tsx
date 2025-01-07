import { PropertyForm } from '../../add/_components/PropertyForm';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getPropertyRefs } from '../../actions';
import { properties } from 'kotilogi-app/dataAccess/properties';

export default async function EditPropertyPage({ params }) {
  const { propertyId: id } = await params;
  const property = await properties.get(id);
  const refs = await getPropertyRefs();

  return (
    <main className='flex justify-center'>
      <div className='xs:w-full xl:w-[90%] flex flex-col gap-4'>
        <SecondaryHeading>Muokkaa taloa</SecondaryHeading>
        <PropertyForm
          property={property}
          refs={refs}
        />
      </div>
    </main>
  );
}
