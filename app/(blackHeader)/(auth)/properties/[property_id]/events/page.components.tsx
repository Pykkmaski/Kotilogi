'use client';

import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import { GalleryError } from '@/components/new/Gallery/GalleryBase/Components/Error/GalleryError';
import { SearchBar } from 'kotilogi-app/components/SearchBar';
import { AddButton, DeleteButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import DeleteSelectedItemsModal from '@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal';
import { deleteEvent } from 'kotilogi-app/actions/experimental/events';
import AddEventModal from './AddEventModal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { SearchForEventsModal } from './SearchForEventsModal';
import { GalleryListItem } from '@/components/new/Gallery/GalleryBase/GalleryListItem';
import { ListItem } from '@/components/ListItem/ListItem';

/**The main content rendering component of the page. */
export function Content({ events, propertyId, userEmail }) {
  return (
    <Gallery<Kotidok.EventType> data={events}>
      <Gallery.AddModal>
        <AddEventModal propertyId={propertyId} />
      </Gallery.AddModal>

      <Gallery.DeleteModal>
        <DeleteSelectedItemsModal deleteMethod={item => deleteEvent(item.id)} />
      </Gallery.DeleteModal>

      <Gallery.Header title='Tapahtumat'>
        <div className='flex gap-4 items-center'>
          <div className='xs:hidden lg:block'>
            <SearchBar />
          </div>

          <div className='xs:block lg:hidden'>
            <VisibilityProvider>
              <VisibilityProvider.Trigger>
                <i className='fa fa-search text-xl xs:block lg:hidden text-black cursor-pointer' />
              </VisibilityProvider.Trigger>

              <VisibilityProvider.Target>
                <SearchForEventsModal />
              </VisibilityProvider.Target>
            </VisibilityProvider>
          </div>

          <Gallery.DeleteModalTrigger>
            <DeleteButton />
          </Gallery.DeleteModalTrigger>

          <Gallery.AddModalTrigger>
            <AddButton />
          </Gallery.AddModalTrigger>
        </div>
      </Gallery.Header>

      <Gallery.Body
        displayStyle='vertical'
        itemComponent={props => {
          const isConsolidated = props.item.createdBy !== userEmail;

          return (
            <GalleryListItem
              {...props}
              title={props.item.title}
              description={props.item.description}
              href={`/events/${props.item.id}/info`}
              footerText={
                new Date(props.item.createdAt).toLocaleDateString('fi-FI') || 'Ei päivämäärää.'
              }
              faIcon='fa fa-history'
              secondaryHeaderContent={
                isConsolidated ? (
                  <i
                    className='fa fa-lock text-red-700'
                    title='Tapahtuma on vakiintunut, eikä sitä voi muokata.'
                  />
                ) : (
                  <i className='fa fa-check text-green-700' />
                )
              }
              controlsContent={!isConsolidated ? <ListItem.CheckBox /> : null}
            />
          );
        }}
        errorElement={
          <GalleryError
            title='Ei Tapahtumia'
            message='Et ole vielä lisännyt tapahtumia. Aloita painamalla Lisää-Uusi painiketta.'
            icon='/icons/history.png'
          />
        }
      />
    </Gallery>
  );
}
