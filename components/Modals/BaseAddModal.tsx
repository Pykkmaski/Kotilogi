import React, { useRef } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import { useStatus } from "./BaseAddModal.hooks";
import Modal, { ModalProps } from "./Modal";

type BaseAddModalProps = ModalProps & {
    refId: Kotilogi.IdType,
    submitMethod: (e) => Promise<any>,
    onHide: () => void,
    title: string,
}

export function BaseAddModal({children, refId, submitMethod, ...props}: BaseAddModalProps){
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useStatus('idle');

    const onSubmit = (e) => {
        e.preventDefault();

        setStatus('loading');

        submitMethod(e)
        .then(res => {
            setStatus('success');
            closeModal();
        })
        .catch(err => {
            console.log(err.message);
            setStatus('error');
        });
    }

    const closeModal = () => {
        props.onHide();
        formRef.current?.reset();
    }

    const formId = `${props.id}-form`;
    const loading = status === 'loading';

    return (
        <Modal {...props}>
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit} ref={formRef} id={formId}>
                    {children}
                </form>
            </Modal.Body>

            <Modal.Footer>
                <SecondaryButton
                    desktopText="Peruuta"
                    onClick={() => {
                        closeModal();
                    }}
                    disabled={loading}/>

                <PrimaryButton
                    desktopText="Lähetä"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    form={formId}/>
            </Modal.Footer>
        </Modal>
    );
}