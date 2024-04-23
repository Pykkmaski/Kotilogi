'use client';

import { List } from '@/components/List';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { AddEventModalPrefab } from './AddEventModalPrefab';
import { Heading } from '@/components/Heading';
import { GalleryListItem } from '@/components/new/Gallery/GalleryBase/GalleryListItem';
import { deleteEvent } from 'kotilogi-app/actions/experimental/events';
import { DeleteSelectedModal, ResetSelectedButton } from '@/components/Prefabs/List.prefabs';

export function EventsList({ events, propertyId }) {
  return (
    <SelectablesProvider>
      <div className='flex justify-between items-center w-full mb-8'>
        <Heading>Tapahtumat</Heading>
        <div className='flex gap-4 items-center'>
          <SelectablesProvider.HideIfNoneSelected>
            <div className='animate-slideup-fast'>
              <div className='flex items-center gap-2 text-lg'>
                <ResetSelectedButton />

                <DeleteSelectedModal
                  headerText='Poista valitut tapahtumat'
                  iconHoverText='Poista valitut tapahtumat...'
                  bodyText='Haluatko varmasti poistaa valitsemasi tapahtumat?'
                  successText='Tapahtuma(t) poistettu!'
                  deleteMethod={deleteEvent}
                />
              </div>
            </div>
          </SelectablesProvider.HideIfNoneSelected>
          <AddEventModalPrefab propertyId={propertyId} />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <List<Kotidok.EventType>
          data={events}
          Component={props => {
            const isEditable = true;

            return (
              <SelectablesProvider.HighlightIfSelected item={props.item}>
                <GalleryListItem
                  {...props}
                  title={props.item.title}
                  description={props.item.description}
                  faIcon='fa fa-home'
                  footerText={props.item.createdAt}
                  href={`/events/${props.item.id}/info`}
                  secondaryHeaderContent={
                    isEditable ? (
                      <i
                        className='fa fa-check text-green-700'
                        title='Tapahtuma on muokattavissasi.'
                      />
                    ) : (
                      <i
                        className='fa fa-ban text-red-700'
                        title='Et voi muokata tätä tapahtumaa.'
                      />
                    )
                  }
                  controlsContent={
                    isEditable ? (
                      <SelectablesProvider.SelectTrigger item={props.item}>
                        <input type='checkbox' />
                      </SelectablesProvider.SelectTrigger>
                    ) : null
                  }
                />
              </SelectablesProvider.HighlightIfSelected>
            );
          }}
        />
      </div>
    </SelectablesProvider>
  );
}
