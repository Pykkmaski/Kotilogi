import { Main } from '@/components/New/Main';
import { redirect } from 'next/navigation';
import { DeletePropertyForm } from './_components/DeletePropertyForm';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export default async function DeletePropertyPage({ params, searchParams }) {
  const session = await verifySession();
  const [property] = await db('data_properties').where({ id: params.propertyId });

  const [owner] = await db('data_propertyOwners').where({
    userId: session.user.id,
    propertyId: property.id,
  });
  const allowed = owner !== undefined;

  return (
    <Main>
      {(allowed && <DeletePropertyForm property={property} />) || (
        <span>Sinulla ei ole talon poisto-oikeutta!</span>
      )}
    </Main>
  );
}
