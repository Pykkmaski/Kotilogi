import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { EventOverview } from './_components/EventOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { getEventsOfProperty } from 'kotilogi-app/dataAccess/events';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;

  const events = (await getEventsOfProperty(propertyId, search, 10)) as EventDataType[];

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
        addButtonUrl={`/dashboard/properties/${propertyId}/events/add`}
        OverviewComponent={async ({ item }) => {
          return (
            <EventOverview
              event={{
                ...item,
              }}
            />
          );
        }}
      />
    </Main>
  );
}
