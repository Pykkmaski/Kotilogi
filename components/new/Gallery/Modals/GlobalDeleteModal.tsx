import serverDeleteData from "kotilogi-app/actions/serverDeleteData";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import React, { useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import toast from "react-hot-toast";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

export default function DeleteModal(props: ModalProps){
    const formId = `form-${props.id}`;
    const {props: {tableName}, state, dispatch} = useGalleryContext();   
    const [loading, setLoading] = useState(false);

    const onDeleteHandler = async () => {
        setLoading(true);

        for(const selectedItem of state.selectedItems){
            const error = await serverDeleteData(selectedItem.id, tableName);
            if(error !== 0){
                const message = `
                    Kohteen \"${selectedItem.title}\" poisto epäonnistui!
                `;

                toast.error(message);
            }
            else{
                const message = `
                    Kohteen \"${selectedItem.title}\" poisto onnistui!
                `;

                toast.success(message);
                const path = (
                    tableName === 'propertyEvents' ? '/auth/properties/new/[property_id]/events'
                    :
                    tableName === 'properties' ? '/auth/properties'
                    :
                    ''
                );

                await serverRevalidatePath(path);
            }
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
            <Modal.Body>
                Olet poistamassa seuraavia kohteita:<br/>
                {
                    state.selectedItems.map((item, index: number) => {
                        return (
                            <React.Fragment key={`item-pending-deletion-${index}`}>
                                <strong key={`item-pending-deletion-${index}`}>{item.title || item.fileName}</strong>
                                <br/>
                            </React.Fragment>  
                        )
                    })
                }
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