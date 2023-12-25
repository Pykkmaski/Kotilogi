import Button from 'kotilogi-app/components/Button/Button';
import useGalleryContext from '../../GalleryContext';
import style from './style.module.scss';
import BinIcon from '@/assets/bin.png';
import PlusIcon from '@/assets/plus.png';
import AddButton from '../AddButton/AddButton';
import PageIndicator from '../PageIndicator/PageIndicator';
import { SearchField } from '../SearchField/SearchField';
import { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { useState } from 'react';

export default function Header(props: {
    title: string,
    AddModal?: React.FC<ModalProps>,

    /**The modal displayed when deleting multiple items at once. */
    DeleteModal?: React.FC<ModalProps>,
}){
    const {state, dispatch} = useGalleryContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {AddModal, DeleteModal} = props;

    const buttons = (
        <>
            {
                DeleteModal ? 
                <Button
                    className="secondary"
                    desktopText="Poista"
                    disabled={state.selectedItems.length === 0}
                    mobileIconSrc={BinIcon}
                    onClick={() => setShowDeleteModal(true)}/> : null
            }

            {
                AddModal ? 
                <Button 
                    className="primary" 
                    desktopText='Lisää Uusi' 
                    mobileIconSrc={PlusIcon}
                    onClick={() => setShowAddModal(true)}/> : null
            }
        </>
    )
    
    return (
        <>
            {AddModal ? <AddModal id="gallery-add-modal" show={showAddModal} onHide={() => setShowAddModal(false)}/> : null}
            {DeleteModal ? <DeleteModal id="gallery-delete-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}/> : null}
            
            {props.DeleteModal}
            <div className={style.galleryHeader}>
                <div className={style.titleContainer}>
                    <h2>{props.title}</h2>
                </div>

                <div className={style.buttonsContainer}>
                    <SearchField/>    
                    {buttons}
                </div>
            </div>
        </>
        
    )
}