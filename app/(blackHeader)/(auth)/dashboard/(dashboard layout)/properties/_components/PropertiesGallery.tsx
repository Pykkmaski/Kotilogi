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
import { DialogControl } from '@/components/Util/DialogControl';
import { Dialog } from '@mui/material';
import { MuiAddPropertyDialog, OldDialog } from './MuiAddPropertyDialog';
import { Card } from '@/components/UI/Card';

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
      {/**The dialog displayed after a user adds their first property */}
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
                    <DeletePropertiesModalTrigger />
                  </SelectablesProvider.ResetSelectedTrigger>
                </ListHeaderControlButtons>
              </div>
            </SelectablesProvider.HideIfNoneSelected>
            <DialogControl
              trigger={params => {
                return <AddButton {...params} />;
              }}
              control={({ show, handleClose }) => {
                return (
                  <OldDialog
                    show={show}
                    handleClose={handleClose}
                  />
                );
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
                  href={isActive ? `/properties/${props.item.id}/info` : ''}
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
