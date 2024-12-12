import { DeletePropertyForm } from './_components/DeletePropertyForm';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { properties } from 'kotilogi-app/dataAccess/properties';

export default async function DeletePropertyPage({ params, searchParams }) {
  const session = await verifySession();
  const property = await properties.get(params.propertyId);

  const [owner] = await db('data_propertyOwners').where({
    userId: session.user.id,
    propertyId: property.id,
  });
  const allowed = owner !== undefined;

  return (
    <main className='flex justify-center'>
      <div className='flex lg:w-[70%] xs:w-full'>
        {(allowed && <DeletePropertyForm property={property} />) || (
          <span>Sinulla ei ole talon poisto-oikeutta!</span>
        )}
      </div>
    </main>
  );
}
