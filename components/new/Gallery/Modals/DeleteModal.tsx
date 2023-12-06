import serverDeleteData from "kotilogi-app/actions/serverDeleteData";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import React, { useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import toast from "react-hot-toast";

export default function DeleteModal(props: ModalProps & {
    title: string,
}){
    const formId = `form-${props.id}`;
    const {props: {tableName}, loadData, state, dispatch} = useGalleryContext();   
    const [loading, setLoading] = useState(false);

    const onDeleteHandler = async (e) => {
        e.preventDefault();
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
            }
        }

        dispatch({
            type: 'reset_selected',
            value: null,
        });

        loadData();
        setLoading(false);
        props.onHide();
    }

    return (
        <Modal id={props.id} show={props.show} onHide={props.onHide}>
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onDeleteHandler} id={formId}>
                    <p>
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
                    </p>
                </Form>
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
                    type="submit"
                    form={formId}
                    disabled={loading}
                    loading={loading}
                />
            </Modal.Footer>
        </Modal>
    )
}