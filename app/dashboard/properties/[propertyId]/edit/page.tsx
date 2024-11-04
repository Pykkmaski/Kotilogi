import { Main } from '@/components/New/Main';
import { getProperty } from 'kotilogi-app/dataAccess/properties';
import { PropertyForm } from '../../add/_components/PropertyForm';
import { getRefs } from 'kotilogi-app/dataAccess/ref';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getPropertyRefs } from '../../actions';

export default async function EditPropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);
  const refs = await getPropertyRefs();

  return (
    <main className='flex justify-center'>
      <div className='xs:w-full md:w-[50%] flex flex-col gap-4'>
        <SecondaryHeading>Muokkaa taloa</SecondaryHeading>
        <PropertyForm
          property={property}
          refs={refs}
        />
      </div>
    </main>
  );
}
