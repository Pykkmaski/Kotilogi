import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import { EventsGallery } from './_components/EventsGallery';

const eventsPerPage = 10;

async function getEvents(propertyId: string, q: string | undefined, page?: number) {
  if (!q || q == 'null') {
    return await db('propertyEvents').where({ refId: propertyId });
  }

  const query = `%${q}%`;
  const events: Kotidok.EventType[] = await db('propertyEvents')
    .where(function () {
      this.whereLike('time', query).orWhereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ refId: propertyId })
    .orderBy('time', 'desc');

  return events;
}

export default async function EventsPage({ params, searchParams }) {
  const events = await getEvents(params.property_id, searchParams.q, searchParams.page);

  const session = await getServerSession();

  return (
    <main>
      <EventsGallery
        events={events}
        propertyId={params.property_id}
        userEmail={session.user.email}
      />
    </main>
  );
}
