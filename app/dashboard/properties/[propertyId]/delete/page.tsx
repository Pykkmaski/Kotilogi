import { Main } from '@/components/New/Main';
import { redirect } from 'next/navigation';
import { DeletePropertyForm } from './_components/DeletePropertyForm';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export default async function DeletePropertyPage({ params, searchParams }) {
  const [property] = await db('data_properties').where({ id: params.propertyId });
  const session = await loadSession();
  if (!session) {
    redirect('/login');
  }
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
