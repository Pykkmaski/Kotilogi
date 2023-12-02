import { useState } from 'react';
import CardDeleteModal from '../Card/CardDeleteModal';
import style from './style.module.scss';

/**
 * Entries to display when a gallery is configured with the display type of list.
 * @param props 
 */
export default function ListEntry(props: {
    item: any
}){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    return (
        <>
            <CardDeleteModal
                id={`usage-delete-modal-${props.item.id}`}
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                item={props.item}
            />
            <div className={style.listEntry}>
                <div className={style.menu}>
                    <span>Muokkaa</span>
                    <span className="danger" onClick={() => setShowDeleteModal(true)}>Poista</span>
                </div>
                <span className={style.title}>{props.item.price}</span>
            </div>
        </>
    );
}