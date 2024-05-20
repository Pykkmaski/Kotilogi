import { Typography } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import { properties } from 'kotilogi-app/utils/properties';

export default async function PropertyPage({ params }) {
  const id = params.property_id;
  const [property] = await db('properties').where({ id });

  return (
    <main className='flex flex-col w-full mt-4'>
      <Typography variant='h6'>{property.title + property.appartmentNumber}</Typography>
    </main>
  );
}
