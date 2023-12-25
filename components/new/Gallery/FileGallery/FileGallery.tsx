'use client';

import GalleryBase from "../GalleryBase/GalleryBase";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import AddFilesModal from "../Modals/AddFilesModal";
import FileItemComponent from "./FileItemComponent/FileItemComponent";
import FileError from "../GalleryBase/Components/Error/FileError";
import GlobalDeleteModal from "../Modals/GlobalDeleteModal/GlobalDeleteModal";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Body from "../GalleryBase/Components/Body/Body";

function ItemComponent(props: {
    item: any
}){
    const {props: {tableName}} = useGalleryContext();

    return (
        <FileItemComponent
            {...props}
            destination={`/api/files/${props.item.id}?tableName=${tableName}`}
        />
    );
}

export default function FileGallery(props: {
    tableName: 'propertyFiles' | 'eventFiles',
    refId: Kotilogi.IdType,
}){
    return (
        <GalleryBase 
            {...props}
            title="Tiedostot"
            contentType="file"
            query={{
                refId: props.refId,
                mimeType: 'application/pdf',
            }}

            AddModal={(hocProps: ModalProps & {id: Kotilogi.IdType}) => {
                return (
                    <AddFilesModal
                        {...hocProps}
                        title="Lisää Tiedostoja"
                        fileType="application/pdf"
                        id={`add-files-modal-${props.refId}`}
                        refId={props.refId}
                    />
                )
            }}  

            DeleteModal={GlobalDeleteModal}>
            
            <Body displayStyle="vertical" itemComponent={ItemComponent} errorComponent={
                <FileError message="Et ole vielä lisännyt tiedostoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."/>
            }/>
        </GalleryBase>
    )
}