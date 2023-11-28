import Button from "kotilogi-app/components/Button/Button";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import useGalleryContext from "../GalleryBase/GalleryContext";
import { serverGetData } from "kotilogi-app/actions/serverGetData";
import serverDeleteFilesByIds from "kotilogi-app/actions/serverDeleteFilesByIds";
import Form from "kotilogi-app/components/Form";

export default function DeleteModalBase(props: ModalProps & {
    headerText: string,
    deleteFunction?: () => Promise<boolean>,
    message: string,
    successMessage: string,
    errorMessage: string,
}){
    const {state, dispatch, props: {refId, tableName}} = useGalleryContext();

    const deleteFunction = async (e) => {
        e.preventDefault();
        if(!props.deleteFunction) return;

        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        var result: boolean = false;

        if(tableName === 'files'){
            result = await serverDeleteFilesByIds(state.selectedItemIds, 'files');
        }
        else {
            result = await props.deleteFunction();
        }

        if(!result){
            toast.error(props.errorMessage);
        }
        else{
            const currentData = await serverGetData(tableName, {refId});

            dispatch({
                type: 'set_data',
                value: currentData,
            });

            dispatch({
                type: 'reset_selected',
                value: null,
            });

            props.onHide();
            toast.success(props.successMessage);
        }

        dispatch({
            type: 'toggle_loading',
            value: false,
        });
    }
    
    const formId = 'gallery-delete-form';
    
    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>{props.headerText}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={deleteFunction} id={formId}>
                    <Form.Group>
                        <label>Poiston syy<span className="danger">*</span></label>
                        <textarea name="reason" required={true}/>
                        <Form.SubLabel>Poistolle tulee antaa vapaamuotoinen syy muutoshistoriaa varten.</Form.SubLabel>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="primary"
                    desktopText="Ei"
                    onClick={() => props.onHide()}
                    disabled={state.isLoading}
                />

                <Button
                    className="secondary"
                    desktopText="Kyllä"
                    type="submit"
                    disabled={state.isLoading}
                    loading={state.isLoading}
                    form={formId}
                />
            </Modal.Footer>
        </Modal>
    )
}