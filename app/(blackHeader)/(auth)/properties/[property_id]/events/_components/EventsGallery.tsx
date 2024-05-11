'use client';

import { SearchBar } from '@/components/Feature/SearchBar';
import { deleteEvent } from 'kotilogi-app/actions/experimental/events';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { SearchForEventsModal } from './SearchForEventsModal';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { AddEventModalTrigger } from './AddEventModalPrefab';
import {
  CancelSelectionButton,
  DeleteButton,
  ListHeaderControlButtons,
} from '@/components/Prefabs/List.prefabs';
import { Gallery } from '@/components/Feature/GalleryBase/Gallery';
import { GalleryListItem } from '@/components/Feature/GalleryBase/GalleryListItem';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';

/**The main content rendering component of the page. */
export function EventsGallery({ events, propertyId, userEmail }) {
  return (
    <Gallery<Kotidok.EventType> data={events}>
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

          <SelectablesProvider.HideIfNoneSelected>
            <div className='animate-slideup-fast'>
              <ListHeaderControlButtons>
                <SelectablesProvider.ResetSelectedTrigger>
                  <CancelSelectionButton />
                </SelectablesProvider.ResetSelectedTrigger>
                <VisibilityProvider>
                  <VisibilityProvider.Trigger>
                    <DeleteButton />
                  </VisibilityProvider.Trigger>

                  <VisibilityProvider.Target>
                    <Gallery.ConfirmDeleteModal
                      title='Poista valitut tapahtumat'
                      bodyText='Olet poistamassa seuraavia tapahtumia:'
                      successMessage='Tapahtuma(t) poistettu!'
                      deleteMethod={deleteEvent}
                    />
                  </VisibilityProvider.Target>
                </VisibilityProvider>
              </ListHeaderControlButtons>
            </div>
          </SelectablesProvider.HideIfNoneSelected>
          <AddEventModalTrigger propertyId={propertyId} />
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
                new Date(props.item.time).toLocaleDateString('fi-FI') || 'Ei päivämäärää.'
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
              controlsContent={
                !isConsolidated ? (
                  <SelectablesProvider.SelectTrigger item={props.item}>
                    <input
                      type='checkbox'
                      className='w-[20px] aspect-square'
                    />
                  </SelectablesProvider.SelectTrigger>
                ) : null
              }
            />
          );
        }}
        errorElement={
          <GalleryError
            title='Ei Tapahtumia'
            message='Et ole vielä lisännyt tapahtumia. Aloita painamalla Lisää-Uusi painiketta.'
            icon='fa-history'
          />
        }
      />
    </Gallery>
  );
}
