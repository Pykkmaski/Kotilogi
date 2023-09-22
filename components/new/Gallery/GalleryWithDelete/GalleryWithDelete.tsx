"use client";

import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import GalleryBase from "../GalleryBase/GalleryBase";
import DeleteButton from "./DeleteButton";
import { GalleryWithDeleteProvider } from "./GalleryWithDeleteProvider";
import { useState } from "react";
import DeleteModal from "./Components/DeleteModal/DeleteModal";

export default function GalleryWithDelete(props: GalleryWithDelete.Props){
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const headerButtons: JSX.Element[] = [
        ...props.headerButtons,
        <SelectAllButton/>,
        <DeleteButton toggleModal={setShowDeleteModal}/>
    ];

    return ( 
        <GalleryBase {...props} headerButtons={[]}>
            <DeleteModal show={showDeleteModal} toggleVisible={setShowDeleteModal}/>
        </GalleryBase>
    );
}