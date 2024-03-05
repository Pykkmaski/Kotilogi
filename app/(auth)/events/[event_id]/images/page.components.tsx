'use client';

import { EventImageListItem } from "kotilogi-app/components/ListItem/ImageListItem";
import { AddFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { ImageError } from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/ImageError";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { deleteFile } from "kotilogi-app/actions/events";
import * as events from '@/actions/events';

export function Content({files, eventId}){
    return (
        <Gallery data={files}>
            <Gallery.Header 
                title="Tiedostot"
                AddModal={(props: ModalProps) => <AddFilesModal 
                    tablename={"eventFiles"} 
                    accept={"image/jpeg"} 
                    refId={eventId} 
                    {...props} 
                    uploadMethod={(fdata: FormData) => events.uploadFile(fdata, eventId)}/>}

                DeleteModal={(props: ModalProps) => <Gallery.DeleteModal {...props} deleteMethod={deleteFile}/>}/>

            <Gallery.Body displayStyle="horizontal" itemComponent={EventImageListItem} errorElement={
                <ImageError message="Et ole vielä lisännyt tapahtumalle kuvia. Aloita painamalla Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    )
}