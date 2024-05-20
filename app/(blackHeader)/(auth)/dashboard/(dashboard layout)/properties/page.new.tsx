import { getServerSession } from 'next-auth';
import { PropertyTabs } from './_components/PropertyTabs';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { UserType } from 'kotilogi-app/types/UserType';
import db from 'kotilogi-app/dbconfig';
import { redirect } from 'next/navigation';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { property_id: string };
}) {
  const session = (await getServerSession(options as any)) as { user: UserType };
  if (!session) throw new Error('Pääsy evätty!');

  const propertyData = (await db('properties')
    .where({
      refId: session.user.email,
    })
    .orderBy('createdAt', 'asc')) as unknown as Kotidok.PropertyType[];

  if (!searchParams.property_id) {
    redirect('/dashboard/properties?property_id=' + propertyData[0].id);
  }

  return (
    <main className='flex flex-col h-full'>
      <PropertyTabs
        properties={propertyData}
        currentPropertyId={searchParams.property_id}
      />
    </main>
  );
}
