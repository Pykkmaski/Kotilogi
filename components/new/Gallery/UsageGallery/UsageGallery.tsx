'use client';

import { CSSProperties } from "react";
import Error from "../GalleryBase/Components/Error/Error";
import GalleryBase from "../GalleryBase/GalleryBase";
import AddModal from "./AddModal";
import Chart from "./Chart";
import UsageItemComponent from "./components/UsageItemComponent/UsageItemComponent";
import BoltIcon from '@/assets/bolt.png';
import Body from "../GalleryBase/Components/Body/Body";
import React from "react";

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
        <GalleryBase 
            title={title}
            contentType="usage"
            tableName="usage"
            query={{
                refId: props.propertyId,
                type: props.type,
            }}
            AddModal={(hocprops: {show: boolean, onHide: () => void}) => {
                return (
                    <AddModal 
                        {...hocprops}
                        type={props.type}
                    />
                )
                
            }}>

            <UsageGalleryBody>
                <Chart title={title} type={props.type}/>
                <Body 
                    itemComponent={UsageItemComponent} 
                    errorComponent={<Error title={"Ei Kulutustietoja"} message={""} icon={BoltIcon}/>}
                    displayStyle="vertical"/>
            </UsageGalleryBody>
            
        </GalleryBase>
    )
}