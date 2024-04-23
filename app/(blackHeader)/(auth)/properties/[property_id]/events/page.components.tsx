'use client';

import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import { GalleryError } from '@/components/new/Gallery/GalleryBase/Components/Error/GalleryError';
import { SearchBar } from 'kotilogi-app/components/SearchBar';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import DeleteSelectedItemsModal from '@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal';
import { deleteEvent } from 'kotilogi-app/actions/experimental/events';
import AddEventModal from './AddEventModal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { SearchForEventsModal } from './SearchForEventsModal';
import { GalleryListItem } from '@/components/new/Gallery/GalleryBase/GalleryListItem';
import { ListItem } from '@/components/ListItem/ListItem';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import { AddEventModalPrefab } from './AddEventModalPrefab';
import {
  CancelSelectionButton,
  DeleteButton,
  ListHeaderControlButtons,
} from '@/components/Prefabs/List.prefabs';
import { ConfirmModal } from '@/components/ConfirmModal';
import { Modal } from '@/components/Experimental/Modal/PlainModal/Modal';
import Button from '@/components/Button/Button';
import toast from 'react-hot-toast';

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
          <AddEventModalPrefab propertyId={propertyId} />
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
            icon='/icons/history.png'
          />
        }
      />
    </Gallery>
  );
}
