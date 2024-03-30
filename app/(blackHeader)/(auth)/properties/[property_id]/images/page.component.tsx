'use client';

import AddFilesModal from "kotilogi-app/components/Experimental/Modal/AddFilesModal";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { PropertyImageListItem } from "kotilogi-app/components/ListItem/ImageListItem";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import { FileError } from "@/components/new/Gallery/GalleryBase/Components/Error/FileError";
import { uploadFile } from "kotilogi-app/actions/uploadFile";
import { deleteFile } from "kotilogi-app/actions/deleteFile";
import { ImageError } from "@/components/new/Gallery/GalleryBase/Components/Error/ImageError";

export function Content({files, propertyId}){
    return (
        <Gallery data={files}>
            <Gallery.AddModal>
                <AddFilesModal accept="image/jpeg" uploadMethod={(fdata: FormData) => uploadFile('propertyFiles', fdata, propertyId)}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={(fileData: Kotilogi.FileType) => deleteFile('propertyFiles', fileData)}/>
            </Gallery.DeleteModal>

            <Gallery.Header title="Kuvat">
                <Gallery.DeleteModalTrigger>
                    <DeleteButton/>
                </Gallery.DeleteModalTrigger>

                <Gallery.AddModalTrigger>
                    <AddButton/>
                </Gallery.AddModalTrigger>
            </Gallery.Header>

            <Gallery.Body displayStyle="horizontal" itemComponent={PropertyImageListItem} errorElement={
                <ImageError message="Et ole vielä lisännyt talolle kuvia. Aloita painamalla Lisää-Uusi painiketta."/>
            }/>
        </Gallery>
    )
}