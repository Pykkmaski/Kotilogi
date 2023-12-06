import { useState } from 'react';
import DeleteModal from '@/components/new/Gallery/Modals/DeleteModal';
import style from './style.module.scss';
import useGalleryContext from '../../../../GalleryContext';

/**
 * Entries to display when a gallery is configured with the display type of list.
 * @param props 
 */
export default function ListEntry(props: {
    item: any
}){
    const {dispatch} = useGalleryContext();

    return (
        <>
            <div className={style.listEntry}>
                <div className={style.menu}>
                    <span>Muokkaa</span>
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
                </div>
                <span className={style.title}>{props.item.price}</span>
            </div>
        </>
    );
}