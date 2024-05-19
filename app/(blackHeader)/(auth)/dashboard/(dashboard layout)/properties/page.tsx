import { getServerSession } from 'next-auth';
import db from 'kotilogi-app/dbconfig';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { PropertiesGallery } from './_components/PropertiesGallery';
import { UserType } from 'kotilogi-app/types/UserType';
import { Tabs } from '@mui/material';
import { PropertyTabs } from './_components/PropertyTabs';

/**A page-component fetching property data for the logged in user and renders a
 * header containing controls as well as a Gallery-component to render the properties.
 */
export default async function PropertiesPage({ searchParams }: any) {
  const session = (await getServerSession(options as any)) as { user: UserType };
  if (!session) throw new Error('Pääsy evätty!');

  const propertyData = (await db('properties').where({
    refId: session.user.email,
  })) as unknown as Kotidok.PropertyType[];

  return (
    <main className='flex-1 h-full'>
      <PropertyTabs properties={propertyData} />
      <PropertiesGallery properties={propertyData} />
    </main>
  );
}
