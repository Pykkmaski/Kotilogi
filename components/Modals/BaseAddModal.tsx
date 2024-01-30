import React, { useRef } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import { useStatus } from "./BaseAddModal.hooks";
import Modal, { ModalProps } from "./Modal";
import { Group } from "../Group/Group";
import Form from "../Form/Form";
import toast from "react-hot-toast";

type BaseAddModalProps = ModalProps & {
    submitMethod: (e) => Promise<any>,
    onHide: () => void,
    title: string,
}

/**A modal component for accepting input of data, to be sent to the server. Contains a form, which accepts the passed children.*/
export function BaseAddModal({children, submitMethod, ...props}: BaseAddModalProps){
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
            toast.error(err.message);
            closeModal();
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
                <Group direction="horizontal" justifyContent="space-between">
                    {status === 'error' ? <Form.Error>Tapahtui odottamaton virhe!</Form.Error> : null}
                    <Group direction="horizontal">
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
                    </Group>
                </Group>
            </Modal.Footer>
        </Modal>
    );
}