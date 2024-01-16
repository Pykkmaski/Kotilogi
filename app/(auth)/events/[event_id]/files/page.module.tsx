'use client';

import { EventFileListItem } from "kotilogi-app/components/ListItem/ListItem";
import { AddFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { FileError } from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/FileError";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";

export function Content({files, eventId}){
    return (
        <Gallery data={files}>
            <Gallery.Header 
                title="Tiedostot"
                AddModal={(props: ModalProps) => <AddFilesModal tablename={"eventFiles"} accept={"application/pdf"} refId={eventId} {...props} />}/>

            <Gallery.Body displayStyle="vertical" itemComponent={EventFileListItem} errorElement={
                <FileError message="Et ole vielä lisännyt tapahtumalle tiedostoja. Aloita painamalla Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    )
}