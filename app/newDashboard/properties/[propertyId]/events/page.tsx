import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Visibility } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import { EventOverview } from './_components/EventOverview';

async function getEvents(propertyId: string, q: string | undefined, page?: number) {
  const table = 'data_propertyEvents';

  if (!q || q == 'null') {
    return await db(table)
      .join('data_objects', 'data_objects.id', '=', 'data_propertyEvents.id')
      .where({ parentId: propertyId });
  }

  const query = `%${q}%`;
  const events: Kotidok.EventType[] = await db(table)
    .join('data_objects', 'data_objects.id', '=', 'data_propertyEvents.id')
    .where(function () {
      this.whereLike('time', query).orWhereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ parentId: propertyId })
    .orderBy('time', 'desc');

  return events;
}

export default async function EventsPage({ params }) {
  const propertyId = params.propertyId;
  const events = (await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ parentId: propertyId })) as EventDataType[];

  return (
    <Main>
      <OverviewBoxList
        getOverviewBoxDeleteUrl={itemId =>
          `/newDashboard/properties/${propertyId}/events/${itemId}/delete`
        }
        listTitle='Tapahtumat'
        items={events}
        addButtonUrl={`/newDashboard/properties/${propertyId}/events/add`}
        getOverviewBoxUrl={itemId => `/newDashboard/properties/${propertyId}/events/${itemId}`}
        OverviewComponent={({ item }) => <EventOverview event={item} />}
      />
    </Main>
  );
}
