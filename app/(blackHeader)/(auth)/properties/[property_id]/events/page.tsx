import db from 'kotilogi-app/dbconfig';
import { EventsGallery } from './_components/EventsGallery';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';

const eventsPerPage = 10;

async function getEvents(propertyId: string, q: string | undefined, page?: number) {
  const table = 'propertyEventData';

  if (!q || q == 'null') {
    return await db(table)
      .join('objectData', 'objectData.id', '=', 'propertyEventData.id')
      .where({ parentId: propertyId });
  }

  const query = `%${q}%`;
  const events: Kotidok.EventType[] = await db(table)
    .join('objectData', 'objectData.id', '=', 'propertyEventData.id')
    .where(function () {
      this.whereLike('time', query).orWhereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ parentId: propertyId })
    .orderBy('time', 'desc');

  return events;
}

export default async function EventsPage({ params, searchParams }) {
  const events = await getEvents(params.property_id, searchParams.q, searchParams.page);
  const session = (await getServerSession(options as any)) as any;

  return (
    <main>
      <EventsGallery
        events={events}
        propertyId={params.property_id}
        userId={session.user.id}
      />
    </main>
  );
}
