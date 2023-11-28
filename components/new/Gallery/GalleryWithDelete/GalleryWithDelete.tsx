"use client";

import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import GalleryBase from "../GalleryBase/GalleryBase";
import DeleteButton from "./DeleteButton";
import { GalleryWithDeleteProvider } from "./GalleryWithDeleteProvider";
import { useState } from "react";

export default function GalleryWithDelete(props: GalleryWithDelete.Props){
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const headerButtons: JSX.Element[] = [
        ...props.headerButtons,
        <DeleteButton toggleModal={setShowDeleteModal}/>
    ];

    const contextValue = {
        showDeleteModal,
        setShowDeleteModal,
    }

    return ( 
        <GalleryWithDeleteProvider value={contextValue}>
            <GalleryBase {...props}>
                {
                    props.DeleteModal !== undefined ? 
                    <props.DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}/>
                    :
                    null
                }
                
            </GalleryBase>  
        </GalleryWithDeleteProvider>
        
    );
}