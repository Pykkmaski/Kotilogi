'use client';

import {Gallery} from "../GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import AddFilesModal from "../Modals/AddFilesModal";
import FileItemComponent from "./FileItemComponent/FileItemComponent";
import FileError from "../GalleryBase/Components/Error/FileError";
import GlobalDeleteModal from "../Modals/GlobalDeleteModal/GlobalDeleteModal";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Body from "../GalleryBase/Components/Body/Body";
import Header from "../GalleryBase/Components/Header/Header";

function AddModal(props: ModalProps){
    const {props: {query: {refId}}} = useGalleryContext();
    return (
        <AddFilesModal
            {...props}
            title="Lisää Tiedostoja"
            fileType="application/pdf"
            id={`add-files-modal`}
            refId={refId}
        />
    )
}

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
        <Gallery 
            {...props}
            title="Tiedostot"
            query={{
                refId: props.refId,
                mimeType: 'application/pdf',
            }}>
                
            <Header title="Tiedostot" AddModal={AddModal} DeleteModal={GlobalDeleteModal}/>
            <Body displayStyle="vertical" itemComponent={ItemComponent} errorComponent={
                <FileError message="Et ole vielä lisännyt tiedostoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    )
}