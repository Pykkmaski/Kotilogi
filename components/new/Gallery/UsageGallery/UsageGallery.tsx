'use client';

import ErrorComponent from "../GalleryBase/Components/Error/Error";
import {Gallery} from "../GalleryBase/Gallery";
import Chart from "./Chart";
import UsageItemComponent from "./components/UsageItemComponent/UsageItemComponent";
import React from "react";
import { UsageGalleryBody } from "./components/UsageGalleryBody";
import { UsageAddModal } from "./components/UsageAddModal";


export default function UsageGallery(props: {
    propertyId: Kotilogi.IdType,
    type: 'heat' | 'water' | 'electric',
}){

    const title = (
        props.type === 'heat' ? 'Lämmityskulut'
        :
        props.type === 'water' ? 'Vesikulut'
        :
        props.type === 'electric' ? 'Sähkökulut'
        :
         ''
    );

    return (
        <Gallery 
            title={title}
            tableName="usage"
            query={{
                refId: props.propertyId,
                type: props.type,
            }}
           >
            <Gallery.Header title="Kulutustiedot" AddModal={UsageAddModal}/>
            <UsageGalleryBody>
                <Chart title={title} type={props.type}/>
                <Gallery.Body 
                    itemComponent={UsageItemComponent} 
                    errorComponent={<ErrorComponent title={"Ei Kulutustietoja"} message={""} icon={'/icons/bolt.png'}/>}
                    displayStyle="vertical"/>
            </UsageGalleryBody>
        </Gallery>
    )
}