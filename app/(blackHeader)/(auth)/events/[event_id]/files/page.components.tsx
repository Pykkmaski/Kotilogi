'use client';

import { EventFileListItem } from "kotilogi-app/components/ListItem/FileListItem";
import { AddFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { FileError } from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/FileError";
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
                    accept={"application/pdf"} 
                    refId={eventId} 
                    {...props} 
                    uploadMethod={(fdata: FormData) => events.uploadFile(fdata, eventId)}/>}

                DeleteModal={(props: ModalProps) => <Gallery.DeleteModal {...props} deleteMethod={deleteFile}/>}/>

            <Gallery.Body displayStyle="vertical" itemComponent={EventFileListItem} errorElement={
                <FileError message="Et ole vielä lisännyt tapahtumalle tiedostoja. Aloita painamalla Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    );
}