'use client';

import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import {default as ExperimentalModal} from '@/components/Experimental/Modal/Modal';
import { AddPropertyModal as AddPropertyModalOld} from '@/components/Modals/AddModal';
import AddPropertyModal from '@/components/Experimental/Modal/AddPropertyModal';
import { PropertyListItem } from 'kotilogi-app/components/ListItem/ListItem';
import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import {Error} from 'kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error';
import * as properties from '@/actions/properties';
import Button from '@/components/Button/Button';
import { Heading } from '@/components/Heading';
import { useState } from 'react';
import { CloseButton } from '@/components/CloseButton';
import DeleteSelectedItemsModal from '@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal';
import { AddButton, DeactivateButton, DeleteButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import DeactivateSelectedItemsModal from '@/components/new/Gallery/GalleryBase/DeactivateSelectedItemsModal';
import { deactivateProperty } from 'kotilogi-app/actions/deactivateProperties';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider/VisibilityProvider';
import { Modal } from '@/components/Experimental/Modal/PlainModal/Modal';

function PropertiesGallery({propertyData, user}){
    return (
        <Gallery<Kotilogi.PropertyType> data={propertyData}>
            <Gallery.AddModal>
                <AddPropertyModal owner={user.email}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeactivateSelectedItemsModal deactivationMethod={deactivateProperty}/>
            </Gallery.DeleteModal>

            <Gallery.Header title="Talot">
                <div className="flex gap-4 items-center">
                    <Gallery.DeleteModalTrigger>
                        <DeactivateButton/>
                    </Gallery.DeleteModalTrigger>

                    <Gallery.AddModalTrigger>
                        <AddButton/>
                    </Gallery.AddModalTrigger>
                </div>
            </Gallery.Header>
            
            <Gallery.Body displayStyle='vertical' itemComponent={PropertyListItem} errorElement={
                <Error title="Ei Taloja" message="Et ole vielä lisännyt taloja." icon="/icons/house.png"/>
            }/>
        </Gallery>
    )
}

export function Content({propertyData, user}: {
    propertyData: Kotilogi.PropertyType[],
    user: {email: string}
}){
  
    return (
        <main className='mb-4 flex-1 h-full'>
            <PropertiesGallery propertyData={propertyData} user={user}/>
        </main>
    );
}