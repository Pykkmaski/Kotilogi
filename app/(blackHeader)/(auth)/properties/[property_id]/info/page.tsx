'use server';

import { Header } from '@/components/UI/Header/Header';
import { Group } from '@/components/UI/Group';
import db from 'kotilogi-app/dbconfig';
import { Content } from './_components/Content';
import { Heading } from '@/components/UI/Heading';

export default async function InfoPage({ params }) {
  const property = await db('properties').where({ id: params.property_id }).first();
  if (!property) throw new Error('Talon lataaminen epäonnistui!');

  return (
    <main className='flex-col flex gap-4 w-full'>
      <Header>
        <Heading>Tiedot</Heading>
      </Header>

      <div className='w-full'>
        <Group
          direction='col'
          gap={4}>
          <Content propertyData={property} />
        </Group>
      </div>
    </main>
  );
}
