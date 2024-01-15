import {deleteData} from "kotilogi-app/actions/data/deleteData.old";
import Button from "kotilogi-app/components/Button/Button";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import React, { useState } from "react";
import toast from "react-hot-toast";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import style from './style.module.scss';
import { useGalleryContext } from "../../GalleryBase/Gallery";

/**
 * Modal to display when pressing the delete button on the header of galleries, after selecting items.
 * @param props 
 * @returns 
 */

export default function GlobalDeleteModal(props: ModalProps){
    const formId = `form-${props.id}`;
    const {props: {tableName}, state, dispatch} = useGalleryContext();   
    const [loading, setLoading] = useState(false);

    const onDeleteHandler = async () => {
        setLoading(true);

        try{
            for(const selectedItem of state.selectedItems){
                await deleteData(selectedItem.id, tableName);
            }

            toast.success('Kohteiden poisto onnistui!');
            await serverRevalidatePath('');
        }
        catch(err){
            toast.error(err.message);
        }
        

        dispatch({
            type: 'reset_selected',
            value: null,
        });

        setLoading(false);
        props.onHide();
    }

    return (
        <Modal {...props}>
            <Modal.Header>Poista</Modal.Header>
            <Modal.Body className={style.body}>
                <span>Olet poistamassa seuraavia kohteita:</span>
                <ul>
                    {
                        state.selectedItems.map((item, index: number) => {
                            return (
                                <li key={`item-pending-deletion-${index}`}>
                                    <strong key={`item-pending-deletion-${index}`}>{item.title || item.fileName}</strong>
                                </li>  
                            )
                        })
                    }
                </ul>
                
                Oletko Varma?
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className="secondary"
                    desktopText="Ei"
                    onClick={() => {
                        dispatch({
                            type: 'reset_selected',
                            value: null,
                        });
                        props.onHide();
                    }}
                    disabled={loading}
                />

                <Button
                    className="primary"
                    desktopText="Kyllä"
                    onClick={onDeleteHandler}
                    form={formId}
                    disabled={loading}
                    loading={loading}
                />
            </Modal.Footer>
        </Modal>
    )
}