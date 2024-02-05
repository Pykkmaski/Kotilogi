import toast from "react-hot-toast";
import { useInputData } from "./BaseAddModal.hooks"
import Modal, { ModalProps } from "./Modal"
import React, { useRef } from "react";
import {SecondaryButton} from "../Button/SecondaryButton";
import {PrimaryButton} from "../Button/PrimaryButton";

type AddDataModalProps = ModalProps & {
    title: string,
    initialData: Kotilogi.IdType,
    onSubmit: (value: object) => Promise<object>,
}   

export function AddDataModal({children, title, initialData, onSubmit, ...props}: AddDataModalProps){
    const {data, updateData} = useInputData(initialData);
    const formRef = useRef<HTMLFormElement | null>(null);
    
    const modalSubmit = (e) => {
        e.preventDefault();
        onSubmit(data)
        .then(res => {
            toast.success('Tiedon lähetys onnistui!');
        })
        .catch(err => {
            toast.error(err.message);
        });
    }

    const closeModal = () => {
        formRef.current?.reset();
        props.onHide();
    }

    const formId = `${props.id}-form`;

    return (
        <Modal {...props}>
            <Modal.Header>{title}</Modal.Header>
            <form onSubmit={modalSubmit} ref={formRef} id={formId}>
                {
                    React.Children.map(children, (child: React.ReactElement) => {
                        return React.cloneElement(child, {
                            ...child.props,
                            onChange: updateData,
                        })
                    })
                }
            </form>
            <Modal.Footer>
                <SecondaryButton onClick={closeModal}>Peruuta</SecondaryButton>
                <PrimaryButton type="submit" form={formId}>Lähetä</PrimaryButton>
            </Modal.Footer>
        </Modal>
    );
}