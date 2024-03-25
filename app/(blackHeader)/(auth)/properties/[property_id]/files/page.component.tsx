'use client';

import { AddFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import {FileError} from '@/components/new/Gallery/GalleryBase/Components/Error/FileError';
import { PropertyFileListItem } from "kotilogi-app/components/ListItem/FileListItem";
import * as properties from '@/actions/properties';
import * as file from '@/actions/file';

export function Content({files, propertyId}){
    return (
        <Gallery data={files}>
            <Gallery.Header 
                title="Tiedostot"
                AddModal={(props: ModalProps) => <AddFilesModal 
                    {...props} 
                    tablename="propertyFiles" 
                    accept="application/pdf" 
                    refId={propertyId} 
                    uploadMethod={(fdata: FormData) => properties.uploadFile(fdata, propertyId)}/>}

                DeleteModal={(props: ModalProps) => <Gallery.DeleteModal<Kotilogi.FileType> {...props} deleteMethod={(item) => properties.deleteFile(item)}/>}
            />

            <Gallery.Body displayStyle="vertical" itemComponent={PropertyFileListItem} errorElement={
                <FileError message="Et ole vielä lisännyt talolle tiedotoja. Aloita painamalla Lisää-Uusi painiketta."/>
            }/>
        </Gallery>
    )
}