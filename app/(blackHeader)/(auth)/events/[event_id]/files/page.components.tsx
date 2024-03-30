'use client';

import { EventFileListItem } from "kotilogi-app/components/ListItem/FileListItem";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { FileError } from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/FileError";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import * as events from '@/actions/events';
import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import { uploadFile } from "kotilogi-app/actions/uploadFile";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { deleteFile } from "kotilogi-app/actions/deleteFile";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";

export function Content({files, eventId}){
    return (
        <Gallery data={files}>

            <Gallery.AddModal>
                <AddFilesModal accept="application/pdf" uploadMethod={(fdata: FormData) => uploadFile('eventFiles', fdata, eventId)} />
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={(fdata: Kotilogi.FileType) => deleteFile('eventFiles', fdata)} />
            </Gallery.DeleteModal>

            <Gallery.Header title="Tiedostot">
                <Gallery.DeleteModalTrigger>
                    <DeleteButton/>
                </Gallery.DeleteModalTrigger>
                
                <Gallery.AddModalTrigger>
                    <AddButton/>
                </Gallery.AddModalTrigger>
            </Gallery.Header>

            <Gallery.Body displayStyle="vertical" itemComponent={EventFileListItem} errorElement={
                <FileError message="Et ole vielä lisännyt tapahtumalle tiedostoja. Aloita painamalla Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    );
}