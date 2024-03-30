'use client';

import { EventImageListItem } from "kotilogi-app/components/ListItem/ImageListItem";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { ImageError } from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/ImageError";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import * as events from '@/actions/events';
import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import { FileError } from "@/components/new/Gallery/GalleryBase/Components/Error/FileError";
import { uploadFile } from "kotilogi-app/actions/uploadFile";
import { deleteFile } from "kotilogi-app/actions/deleteFile";

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

            <Gallery.Body displayStyle="vertical" itemComponent={EventImageListItem} errorElement={
                <FileError message="Et ole vielä lisännyt tapahtumalle tiedostoja. Aloita painamalla Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    )
}