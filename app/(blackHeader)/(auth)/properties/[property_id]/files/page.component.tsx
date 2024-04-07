'use client';

import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import {FileError} from '@/components/new/Gallery/GalleryBase/Components/Error/FileError';
import { PropertyFileListItem } from "kotilogi-app/components/ListItem/FileListItem";
import * as properties from '@/actions/properties';
import * as file from '@/actions/file';
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import { uploadFile } from "kotilogi-app/actions/uploadFile";
import { addFile } from "kotilogi-app/actions/experimental/addFile";
import { deleteFile } from "kotilogi-app/actions/experimental/deleteFile";

export function Content({files, propertyId}){
    return (
        <Gallery data={files}>
            <Gallery.AddModal>
                <AddFilesModal accept="application/pdf" uploadMethod={async (fdata: FormData) => {
                    await addFile('propertyFiles', fdata, propertyId);
                }}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={async (fileData: Kotilogi.FileType) => {
                    await deleteFile('propertyFiles', fileData.fileName);
                }}/>
            </Gallery.DeleteModal>

            <Gallery.Header title="Tiedostot">
                <Gallery.DeleteModalTrigger>
                    <DeleteButton/>
                </Gallery.DeleteModalTrigger>

                <Gallery.AddModalTrigger>
                    <AddButton/>
                </Gallery.AddModalTrigger>
            </Gallery.Header>

            <Gallery.Body displayStyle="vertical" itemComponent={PropertyFileListItem} errorElement={
                <FileError message="Et ole vielä lisännyt talolle tiedotoja. Aloita painamalla Lisää-Uusi painiketta."/>
            }/>
        </Gallery>
    )
}