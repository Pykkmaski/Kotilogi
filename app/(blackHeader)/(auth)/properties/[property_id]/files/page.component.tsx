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
import { deleteFile } from "kotilogi-app/actions/deleteFile";

export function Content({files, propertyId}){
    return (
        <Gallery data={files}>
            <Gallery.AddModal>
                <AddFilesModal accept="application/pdf" uploadMethod={(fdata: FormData) => uploadFile('propertyFiles', fdata, propertyId)}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={(fileData: Kotilogi.FileType) => deleteFile('propertyFiles', fileData)}/>
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