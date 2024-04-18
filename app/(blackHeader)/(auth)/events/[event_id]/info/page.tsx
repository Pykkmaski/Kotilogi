import { Header } from 'kotilogi-app/components/Header/Header';
import { Heading } from 'kotilogi-app/components/Heading';
import db from 'kotilogi-app/dbconfig';
import { Content } from './page.components';
import { getServerSession } from 'next-auth';

export default async function EventInfoPage({ params }) {
  const event = await db('propertyEvents').where({ id: params.event_id }).first();
  if (!event) throw new Error('Tapahtuman lataaminen epäonnistui! Kokeile päivittää sivu.');

  const session = await getServerSession();
  return (
    <main>
      <Header>
        <Heading>Tapahtuman tiedot</Heading>
      </Header>
      <Content event={event} userEmail={session?.user.email} />
    </main>
  );
}
