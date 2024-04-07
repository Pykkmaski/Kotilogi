'use client';

import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import { PropertyImageListItem } from "@/components/ListItem/ImageListItem";
import { ListItemProps } from "@/components/ListItem/ListItem";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import { ImageError } from "@/components/new/Gallery/GalleryBase/Components/Error/ImageError";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { Gallery } from "@/components/new/Gallery/GalleryBase/Gallery";
import { addFile } from "kotilogi-app/actions/experimental/addFile";
import { deleteFile } from "kotilogi-app/actions/experimental/deleteFile";
import { uploadFile } from "kotilogi-app/actions/uploadFile";
import { FileTableName } from "kotilogi-app/types/FileTableName";

type ImagesGalleryProps = {
    images: Kotilogi.FileType[];

    /**The id of the resource the images belong to, eg. the id of a property. */
    refId: string;

    tablename: FileTableName;

    ImageComponent: React.FC<ListItemProps<Kotilogi.FileType>>;
}

export function ImagesGallery({tablename, images, refId, ImageComponent}: ImagesGalleryProps){
    return (
        <Gallery data={images}>
            <Gallery.AddModal>
                <AddFilesModal accept="image/jpeg" uploadMethod={async (fdata: FormData) => {
                    await addFile(tablename, fdata, refId);
                }}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={async (fileData: Kotilogi.FileType) => {
                    await deleteFile(tablename, fileData.fileName);
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

            <Gallery.Body displayStyle="horizontal" itemComponent={ImageComponent} errorElement={
                <ImageError message="Et ole vielä lisännyt kohteelle kuvia. Aloita painamalla Lisää-Uusi painiketta."/>
            }/>
        </Gallery>
    )
}