'use client';

import Error from "../GalleryBase/Components/Error/Error";
import GalleryBase from "../GalleryBase/GalleryBase";
import AddModal from "./AddModal";
import Chart from "./Chart";
import UsageItemComponent from "./UsageItemComponent";
import style from './style.module.scss';
import BoltIcon from '@/assets/bolt.png';

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
            ItemComponent={UsageItemComponent}
            errorComponent={
                <Error title={"Ei Kulutustietoja"} message={""} icon={BoltIcon}
                />
            }
        >
            <Chart title={title} type={props.type}/>
        </GalleryBase>
    )
}