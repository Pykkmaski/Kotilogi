import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';
import { EventOverview } from './_components/EventOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { getRefTableContent } from '@/actions/util/getRefTableContent';
import { getEvents } from 'kotilogi-app/models/propertyEventData';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;

  const events = (await getEvents({ parentId: propertyId }, search, 10)) as EventDataType[];

  return (
    <Main>
      <OverviewBoxList
        searchBar
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
