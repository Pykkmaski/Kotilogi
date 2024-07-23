import { FormBase } from '@/components/New/Forms/FormBase';
import { Main } from '@/components/New/Main';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Check, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { DeletePropertyForm } from './_components/DeletePropertyForm';
import db from 'kotilogi-app/dbconfig';

export default async function DeletePropertyPage({ params, searchParams }) {
  const [property] = await db('propertyData').where({ id: params.propertyId });

  return (
    <Main>
      <DeletePropertyForm property={property} />
    </Main>
  );
}
