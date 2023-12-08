import { useState } from 'react';
import DeleteModal from '@/components/new/Gallery/Modals/DeleteModal';
import style from './style.module.scss';
import useGalleryContext from '../../../../GalleryContext';

function Menu(props: {
    item: any,
}){
    const {dispatch, props: {tableName}} = useGalleryContext();

    const buttons = (
        <>
            {
                tableName === 'usage' ? <span>Muokkaa</span>
                :
                null
            }
            <span className="danger" onClick={() => {
                dispatch({
                    type: 'select_item',
                    value: props.item,
                });

                dispatch({
                    type: 'toggle_delete_modal',
                    value: true,
                });
            }}>Poista</span>
        </>
    );

    return (
        <div className={style.menu}>
            {buttons}
        </div>
    );
}

function Body(props: {
    item: any
}){
    const {props: {tableName}} = useGalleryContext();

    return (
        <span className={style.title}>
            {
                tableName === 'usage' ? props.item.price + '€'
                :
                tableName.includes('Files') ? props.item.fileName 
                :
                null
            }
        </span>
    );
}

/**
 * Entries to display when a gallery is configured with the display type of list.
 * @param props 
 */
export default function ListEntry(props: {
    item: any
}){
    return (
        <>
            <div className={style.listEntry}>
                <Menu item={props.item}/>
                <Body item={props.item}/>
            </div>
        </>
    );
}