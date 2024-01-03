import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import React from "react";

type AddItemModalProps = ModalProps & {
    title: string,
    loading: boolean,
}

/**A base for modals requiring the upload of form data and files.
 * Accepts the form and dropzone as children. The form must be the first child.
 */
export function AddItemModal({children, loading, ...props}: AddItemModalProps){
    const [form, dropzone] = React.Children.toArray(children) as [JSX.Element, JSX.Element];

    return (
        <Modal {...props} className="edit-modal">
            <div className="edit-modal-wrapper">
                <Modal.Header>{props.title}</Modal.Header>
                <Modal.Body>
                    <SplitScreen rightWeight={5}>
                        {form}
                        {dropzone}
                    </SplitScreen>
                </Modal.Body>
                <Modal.Footer>
                    <SecondaryButton
                        desktopText="Peruuta"
                        onClick={props.onHide}
                        disabled={loading}/>

                    <PrimaryButton
                        desktopText="Lähetä"
                        type="submit"
                        form={form.props.id}
                        loading={loading}
                        disabled={loading}/>
                </Modal.Footer>
            </div>
        </Modal>
    );
}