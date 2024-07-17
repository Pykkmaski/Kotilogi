'use server';

import { Header } from '@/components/UI/Header/Header';
import { Group } from '@/components/UI/Group';
import db from 'kotilogi-app/dbconfig';
import { Content } from './_components/Content';
import { Heading } from '@/components/UI/Heading';
import { Paper } from '@mui/material';
import { PropertyForm } from './_components/PropertyForm';
import { getProperty } from 'kotilogi-app/models/propertyData';

export default async function InfoPage({ params }) {
  const property = await getProperty(params.property_id);
  if (!property) throw new Error('Talon lataaminen epäonnistui!');

  return (
    <main className='flex-col flex gap-4 w-full'>
      <Paper
        sx={{
          padding: '1rem',
        }}>
        <PropertyForm property={property} />
      </Paper>
    </main>
  );
}
