import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Visibility } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';

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

export default async function EventsPage({ params }) {
  const propertyId = params.propertyId;
  const events = (await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
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
      />
    </Main>
  );
}
