'use client';

import GalleryBase from "../GalleryBase/GalleryBase";
import AddModal from "./AddModal";
import Chart from "./Chart";
import style from './style.module.scss';

function ItemComponent(props: {
    item: any,
}){
    return (
        <div className={style.item}>
            <span>{props.item.price}€</span>
        </div>
    );
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
            displayStyle="list"
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
                
            }}
            ItemComponent={ItemComponent}
        >
            <Chart title={title} type={props.type}/>
        </GalleryBase>
    )
}