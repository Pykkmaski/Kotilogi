'use client';

import { addProperty } from 'kotilogi-app/actions/experimental/properties';

import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { Input, Select } from '@/components/Feature/Input';
import toast from 'react-hot-toast';
import { buildingTypes } from 'kotilogi-app/constants';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { CancelSelectionButton, ListHeaderControlButtons } from '@/components/Prefabs/List.prefabs';
import { DeletePropertiesModalTrigger } from './DeletePropertiesModal';
import { Gallery } from '@/components/Feature/GalleryBase/Gallery';
import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { GalleryListItem } from '@/components/Feature/GalleryBase/GalleryListItem';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { AddPropertyModalPrefab } from './AddPropertyModalPrefab';
import { NewAddPropertyModalTrigger } from './NewAddPropertyModal/NewAddPropertyModal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { useState } from 'react';
import { AddPropertySuccessModal } from './AddPropertySuccessModal';

export function PropertiesGallery({ properties }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const displaySuccessModal = (state?: boolean) =>
    setShowSuccessModal(prev => {
      if (state !== undefined) {
        return state;
      } else {
        return !prev;
      }
    });

  return (
    <>
      <VisibilityProvider
        visible={showSuccessModal}
        toggleOverride={displaySuccessModal}>
        <VisibilityProvider.Target>
          <AddPropertySuccessModal />
        </VisibilityProvider.Target>
      </VisibilityProvider>

      <Gallery<Kotidok.PropertyType> data={properties}>
        <Gallery.Header title='Talot'>
          <div className='flex gap-4 items-center'>
            <SelectablesProvider.HideIfNoneSelected>
              <div className='animate-slideup-fast'>
                <ListHeaderControlButtons>
                  <SelectablesProvider.ResetSelectedTrigger>
                    <CancelSelectionButton />
                  </SelectablesProvider.ResetSelectedTrigger>
                  <DeletePropertiesModalTrigger />
                </ListHeaderControlButtons>
              </div>
            </SelectablesProvider.HideIfNoneSelected>
            <NewAddPropertyModalTrigger
              onSubmit={async data => {
                await addProperty(data)
                  .then(({ numProperties, address }) => {
                    if (numProperties === 1) {
                      displaySuccessModal(true);
                    } else {
                      toast.success(`Kohde ${address} lisätty onnistuneesti!`);
                    }
                  })
                  .catch(err => toast.error(err.message));
              }}
            />
          </div>
        </Gallery.Header>

        <Gallery.Body
          displayStyle='vertical'
          itemComponent={props => {
            const isActive = props.item.status === 'ok';

            return (
              <>
                <GalleryListItem
                  {...props}
                  title={
                    props.item.title +
                    ' ' +
                    (props.item.targetType === 'Huoneisto' ? props.item.appartmentNumber : '')
                  }
                  description={props.item.description}
                  faIcon='fa fa-home'
                  footerText={props.item.buildingType}
                  href={isActive ? `/properties/${props.item.id}/events` : ''}
                  secondaryHeaderContent={
                    isActive ? (
                      <i
                        className='fa fa-check text-green-700'
                        title='Talo on käytössä.'
                      />
                    ) : (
                      <i
                        className='fa fa-ban text-red-700'
                        title='Talo on poistettu käytöstä.'
                      />
                    )
                  }
                  controlsContent={
                    isActive ? (
                      <SelectablesProvider.SelectTrigger item={props.item}>
                        <input
                          type='checkbox'
                          className='w-[20px] aspect-square'
                        />
                      </SelectablesProvider.SelectTrigger>
                    ) : null
                  }
                />
              </>
            );
          }}
          errorElement={
            <GalleryError
              title='Ei Taloja'
              message='Et ole vielä lisännyt taloja.'
              icon='fa-home'
            />
          }
        />
      </Gallery>
    </>
  );
}
