'use client';

import {Gallery, useGalleryContext} from "../GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import FileItemComponent from "./FileItemComponent/FileItemComponent";
import FileError from "../GalleryBase/Components/Error/FileError";
import GlobalDeleteModal from "../Modals/GlobalDeleteModal/GlobalDeleteModal";
import { AddFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { DeleteModal } from "kotilogi-app/components/Modals/DeleteModal";
import { deletePropertyEvent } from "kotilogi-app/actions/propertyEvent/deletePropertyEvent";

function AddModal(props: ModalProps){
    const {props: {query: {refId}}} = useGalleryContext();
    return (
        <AddFilesModal
            {...props}
            accept="application/pdf"
            tablename="eventFiles"
            id={`add-files-modal`}
            refId={refId}
        />
    );
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
                
            <Gallery.Header title="Tiedostot" AddModal={AddModal} DeleteModal={(modalProps: ModalProps) => {
                const {state: {selectedItems}, dispatch} = useGalleryContext();

                return (
                    <DeleteModal {...modalProps}
                        targetsToDelete={selectedItems}
                        deleteMethod={deletePropertyEvent}
                        resetSelectedTargets={() => dispatch({
                            type: 'reset_selected',
                            value: null,
                        })}
                    />
                )
            }}/>
            <Gallery.Body displayStyle="vertical" itemComponent={ItemComponent} errorComponent={
                <FileError message="Et ole vielä lisännyt tiedostoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."/>
            }/>
        </Gallery>
    )
}