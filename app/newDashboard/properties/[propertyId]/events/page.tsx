import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Visibility } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import { EventOverview } from './_components/EventOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { SearchBar } from '@/components/Feature/SearchBar';

async function getEvents(propertyId: string, q: string | undefined, page?: number) {
  const table = 'data_propertyEvents';

  if (!q || q == 'null') {
    return await db(table)
      .join('data_objects', 'data_objects.id', '=', 'data_propertyEvents.id')
      .where({ parentId: propertyId });
  }

  const query = `%${q}%`;
  const events: EventDataType = await db(table)
    .join('data_objects', 'data_objects.id', '=', 'data_propertyEvents.id')
    .where(function () {
      this.whereLike('time', query).orWhereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ parentId: propertyId })
    .orderBy('time', 'desc');

  return events;
}

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;
  console.log(search);

  const events = (await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where(function () {
      this.whereLike('title', `%${search}`)
        .orWhereLike('description', `%${search}%`)
        .orWhereLike('startTime', `%${search}%`)
        .orWhereLike('endTime', `%${search}%`);
    })
    .andWhere({ parentId: propertyId })) as EventDataType[];
  console.log(events);

  return (
    <Main>
      <div className='flex w-full justify-end'>
        <SearchBar />
      </div>
      <OverviewBoxList
        getOverviewBoxDeleteUrl={itemId =>
          `/newDashboard/properties/${propertyId}/events/${itemId}/delete`
        }
        listTitle='Tapahtumat'
        onEmptyElement={
          search ? (
            <GalleryError
              title='Ei osumia'
              message={`Haulla '${search}' ei löytynyt tapahtumia.`}
              icon={'fa fa-history'}
            />
          ) : (
            <GalleryError
              title='Ei tapahtumia'
              message='Kohteelle ei ole vielä lisätty tapahtumia'
              icon='fa fa-history'
            />
          )
        }
        items={events}
        addButtonUrl={`/newDashboard/properties/${propertyId}/events/add`}
        getOverviewBoxUrl={itemId => `/newDashboard/properties/${propertyId}/events/${itemId}`}
        OverviewComponent={async ({ item }) => {
          const [{ numSteps }] = await db('data_propertyEventSteps')
            .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })

            .where({ parentId: item.id })
            .count('*', { as: 'numSteps' });

          return (
            <EventOverview
              event={{
                ...item,
                numSteps,
              }}
            />
          );
        }}
      />
    </Main>
  );
}
