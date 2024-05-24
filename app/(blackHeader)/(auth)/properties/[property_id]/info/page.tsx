'use server';

import { Header } from '@/components/UI/Header/Header';
import { Group } from '@/components/UI/Group';
import db from 'kotilogi-app/dbconfig';
import { Content } from './_components/Content';
import { Heading } from '@/components/UI/Heading';
import { Paper } from '@mui/material';
import { PropertyForm } from './_components/PropertyForm';

export default async function InfoPage({ params }) {
  const property = await db('properties').where({ id: params.property_id }).first();
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
