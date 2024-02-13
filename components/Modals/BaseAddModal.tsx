import React, { useRef } from "react";
import {PrimaryButton} from "../Button/PrimaryButton";
import {SecondaryButton} from "../Button/SecondaryButton";
import { useStatus } from "./BaseAddModal.hooks";
import Modal, { ModalProps } from "./Modal";
import { Group } from "../Group";
import toast from "react-hot-toast";
import { ErrorText } from "../Util/Text";

type BaseAddModalProps = ModalProps & {
    submitMethod: (e) => any, //TODO: type this better.
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
            setStatus(res);
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
            <Modal.Header>
                <span className="text-xl text-slate-500">{props.title}</span>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit} ref={formRef} id={formId}>
                    <Group direction="col" gap={4}>
                        {children}
                    </Group>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Group direction="row" justify="between">
                    {status === 'error' ? <ErrorText>Tapahtui odottamaton virhe!</ErrorText> : null}
                    <Group direction="row" gap={4}>
                        <SecondaryButton
                            onClick={() => {
                                closeModal();
                            }}
                            disabled={loading}>Peruuta</SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            form={formId}>Lähetä</PrimaryButton>
                    </Group>
                </Group>
            </Modal.Footer>
        </Modal>
    );
}