import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import React from "react";

export default function ObjectModalBase(props: ModalProps & {
    id: string,
    title: string,
    onSubmitHandler: (e) => void,
    formContent: JSX.Element,
    headerContent: JSX.Element,
    bodyContent: JSX.Element,
    footerContent: JSX.Element,
}){

    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id} className="edit-modal">
            <div className="edit-modal-wrapper">
                <Modal.Header>{props.title}</Modal.Header>
                <div className="edit-modal-body">

                    <div className="form-section">
                        <Form id={`form-${props.id}`} onSubmit={props.onSubmitHandler}>
                            {props.formContent}
                        </Form>
                    </div>

                    <div className="content-section">
                        <div className="content-section-header">
                            {props.headerContent}
                        </div>

                        <div className="content-section-body">
                            {props.bodyContent}
                        </div>
                    </div>
                </div>

                <div className="edit-modal-footer">
                    {props.footerContent}
                </div>
            </div>
        </Modal>
    )
}