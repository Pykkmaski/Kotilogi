import { getServerSession } from 'next-auth';
import db from 'kotilogi-app/dbconfig';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { Content, PropertiesGallery } from './page.components';

/**A page-component fetching property data for the logged in user and renders a
 * header containing controls as well as a Gallery-component to render the properties.
 */
export default async function PropertiesPage({ searchParams }: any) {
  const session = (await getServerSession(options as any)) as { user: { email: string } };
  if (!session) throw new Error('Pääsy evätty!');

  const propertyData = (await db('properties').where({
    refId: session.user.email,
  })) as unknown as Kotidok.PropertyType[];

  return <PropertiesGallery properties={propertyData} />;
}
