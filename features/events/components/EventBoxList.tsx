import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { EventOverview } from './EventOverview';

export function EventBoxList({ events, propertyId, search, currentPage, maxPages }) {
  return (
    <OverviewBoxList
      searchBar
      listTitle={
        <>
          Tapahtumat ({currentPage + 1}/{maxPages})
        </>
      }
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
            event={
              {
                ...item,
              } as any
            }
          />
        );
      }}
    />
  );
}
