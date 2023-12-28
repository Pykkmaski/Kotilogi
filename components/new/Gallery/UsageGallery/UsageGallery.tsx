'use client';

import { CSSProperties } from "react";
import ErrorComponent from "../GalleryBase/Components/Error/Error";
import {Gallery} from "../GalleryBase/Gallery";
import AddModal from "./AddModal";
import Chart from "./Chart";
import UsageItemComponent from "./components/UsageItemComponent/UsageItemComponent";
import BoltIcon from '@/assets/bolt.png';
import Body from "../GalleryBase/Components/Body/Body";
import React from "react";
import Header from "../GalleryBase/Components/Header/Header";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import useGalleryContext from "../GalleryBase/GalleryContext";

function UsageAddModal(props: ModalProps){
    const {props: {query: {type}}} = useGalleryContext();
    if(!type) throw new Error('Usage add modal cannot be rendered because usage type is undefined!');

    return (
        <AddModal 
            {...props}
            type={type}
        />
    );
}

function UsageGalleryBody({children}){
    const style: CSSProperties = {
        display: 'flex',
        flexFlow: 'row',
        width: '100%',
        flex: 1,
    }

    const sideStyle: CSSProperties = {
        flex: 1,
    }

    const [chart, data] = React.Children.toArray(children);
    
    return (
        <div style={style}>
            <div style={sideStyle}>
                {chart}
            </div>

            <div style={sideStyle}>
                {data}
            </div>
        </div>
    )
}
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
            contentType="usage"
            tableName="usage"
            query={{
                refId: props.propertyId,
                type: props.type,
            }}
           >
            <Header title="Kulutustiedot" AddModal={UsageAddModal}/>
            <UsageGalleryBody>
                <Chart title={title} type={props.type}/>
                <Body 
                    itemComponent={UsageItemComponent} 
                    errorComponent={<ErrorComponent title={"Ei Kulutustietoja"} message={""} icon={BoltIcon}/>}
                    displayStyle="vertical"/>
            </UsageGalleryBody>
            
        </Gallery>
    )
}