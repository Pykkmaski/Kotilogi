import { DeletePropertyForm } from './_components/DeletePropertyForm';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { properties } from 'kotilogi-app/features/properties/DAL/properties';

export default async function DeletePropertyPage({ params, searchParams }) {
  const session = await verifySession();
  const { propertyId } = await params;
  const property = await properties.get(propertyId);

  const [owner] = await db('data_propertyOwners').where({
    userId: session.user.id,
    propertyId: property.id,
  });
  const allowed = owner !== undefined;

  return (
    <main className='flex justify-center'>
      <div className='flex xl:w-[90%] xs:w-full'>
        {(allowed && <DeletePropertyForm property={property} />) || (
          <span>Sinulla ei ole talon poisto-oikeutta!</span>
        )}
      </div>
    </main>
  );
}
