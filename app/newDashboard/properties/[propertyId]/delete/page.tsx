import { FormBase } from '@/components/New/Forms/FormBase';
import { Main } from '@/components/New/Main';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Check, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { DeletePropertyForm } from './_components/DeletePropertyForm';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export default async function DeletePropertyPage({ params, searchParams }) {
  const [property] = await db('data_properties').where({ id: params.propertyId });
  const session = await loadSession();
  const owners = await db('data_propertyOwners').where({ propertyId: property.id }).pluck('userId');
  const allowed = owners.includes(session.user.id);

  return (
    <Main>
      {(allowed && <DeletePropertyForm property={property} />) || (
        <span>Sinulla ei ole talon poisto-oikeutta!</span>
      )}
    </Main>
  );
}
