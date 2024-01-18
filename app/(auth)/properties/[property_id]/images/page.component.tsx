'use client';

import { AddFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import {ImageError} from '@/components/new/Gallery/GalleryBase/Components/Error/ImageError';
import { PropertyImageListItem } from "kotilogi-app/components/ListItem/ImageListItem";

export function Content({files, propertyId}){
    return (
        <Gallery data={files}>
            <Gallery.Header 
                title="Kuvat"
                AddModal={(props: ModalProps) => <AddFilesModal {...props} tablename="propertyFiles" accept="image/jpeg" refId={propertyId}/>}
                
            />

            <Gallery.Body displayStyle="horizontal" itemComponent={PropertyImageListItem} errorElement={
                <ImageError message="Et ole vielä lisännyt talolle kuvia. Aloita painamalla Lisää-Uusi painiketta."/>
            }/>
        </Gallery>
    )
}