'use client';

import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import { ListItemProps } from "@/components/ListItem/ListItem";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { Gallery } from "@/components/new/Gallery/GalleryBase/Gallery";
import { deleteFile } from "kotilogi-app/actions/deleteFile";
import { uploadFile } from "kotilogi-app/actions/uploadFile";
import { FileTableName } from "kotilogi-app/types/FileTableName";
import { FileError } from "./Components/Error/FileError";

type FilesGalleryProps = {
    files: Kotilogi.FileType[];

    /**The id of the resource the images belong to, eg. the id of a property. */
    refId: string;

    tablename: FileTableName;

    FileComponent: React.FC<ListItemProps<Kotilogi.FileType>>;
}

export function FilesGallery({tablename, files, refId, FileComponent}: FilesGalleryProps){
    return (
        <Gallery data={files}>
            <Gallery.AddModal>
                <AddFilesModal accept="application/pdf" uploadMethod={(fdata: FormData) => uploadFile(tablename, fdata, refId)}/>
            </Gallery.AddModal>

            <Gallery.DeleteModal>
                <DeleteSelectedItemsModal deleteMethod={(fileData: Kotilogi.FileType) => deleteFile(tablename, fileData)}/>
            </Gallery.DeleteModal>

            <Gallery.Header title="Tiedostot">
                <Gallery.DeleteModalTrigger>
                    <DeleteButton/>
                </Gallery.DeleteModalTrigger>

                <Gallery.AddModalTrigger>
                    <AddButton/>
                </Gallery.AddModalTrigger>
            </Gallery.Header>

            <Gallery.Body displayStyle="vertical" itemComponent={FileComponent} errorElement={
                <FileError message="Et ole vielä lisännyt kohteelle tiedostoja. Aloita painamalla Lisää-Uusi painiketta."/>
            }/>
        </Gallery>
    )
}