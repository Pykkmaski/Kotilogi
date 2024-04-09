'use client';

import { EventFileListItem } from "kotilogi-app/components/ListItem/FileListItem";
import { FileError } from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/FileError";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import { addFiles } from "kotilogi-app/actions/experimental/files";
import { deleteFile } from "kotilogi-app/actions/experimental/files";

export function Content({files, eventId}){
    return (
        <Gallery data={files}>
            <Gallery.AddModal>
                <AddFilesModal accept="application/pdf" uploadMethod={async (fdata: FormData[]) => {
                    await addFiles('eventFiles', fdata, eventId);
                }} />
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={async (fdata: Kotilogi.FileType) => {
                    await deleteFile('eventFiles', fdata.fileName);
                }} />
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