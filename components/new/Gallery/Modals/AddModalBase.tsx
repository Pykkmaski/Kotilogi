import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import useGalleryContext from "../GalleryBase/GalleryContext";
import upload from "kotilogi-app/actions/upload";

/**
 * A base modal component for adding content. The children of the element are passed inside a Form-component.
 * @param props 
 * @returns 
 */

export default function AddModalBase(props: ModalProps & {
    onSubmitHandler?: (e) => Promise<null | object>,
    headerText: string,
    successMessage: string,
    errorMessage: string,
} & {children: React.ReactNode}){

    const {state, dispatch, refId} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(!props.onSubmitHandler) return;

        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        const file = e.target.file ? e.target.file.files[0] : null;
        var addedData: null | unknown = null;

        if(file){
            const data = new FormData();
            data.append('file', file);
            data.append('refId', refId);
            data.append('description', e.target.description.value);
            addedData = await upload(data);
        }
        else{
            addedData = await props.onSubmitHandler(e);
        }

        if(!addedData) {
            //Dispatch a gallery error.
            toast.error(props.errorMessage);
        }
        else{
            dispatch({
                type: 'add_data',
                value: addedData,
            });

            toast.success(props.successMessage);
            props.onHide();
        }
        
        dispatch({
            type: 'toggle_loading',
            value: false,
        });
    }

    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>{props.headerText}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    {props.children}
                    <Form.ButtonGroup>
                        <Button
                            className="secondary"
                            desktopText="Peruuta"
                            onClick={props.onHide}
                            disabled={state.isLoading}
                        />

                        <Button
                            className="primary"
                            desktopText="Lähetä"
                            type="submit"
                            disabled={state.isLoading}
                            loading={state.isLoading}
                        />
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}