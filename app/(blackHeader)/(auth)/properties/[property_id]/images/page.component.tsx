'use client';

import AddFilesModal from "kotilogi-app/components/Experimental/Modal/AddFilesModal";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { PropertyImageListItem } from "kotilogi-app/components/ListItem/ImageListItem";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import { ImageError } from "@/components/new/Gallery/GalleryBase/Components/Error/ImageError";
import { addFiles } from "kotilogi-app/actions/experimental/files";
import { deleteFile } from "kotilogi-app/actions/experimental/files";

export function Content({files, propertyId}){
    return (
        <Gallery data={files}>
            <Gallery.AddModal>
                <AddFilesModal accept="image/jpeg" uploadMethod={async (fdata: FormData[]) => {
                    await addFiles('propertyFiles', fdata, propertyId);
                }}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={async (fileData: Kotilogi.FileType) => {
                    await deleteFile('propertyFiles', fileData.fileName);
                }}/>
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