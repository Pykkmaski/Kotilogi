import { addProperty } from "kotilogi-app/actions/property/addProperty";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import Form from "kotilogi-app/components/Form/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { useOnSubmit } from "kotilogi-app/hooks/useOnSubmit";
import toast from "react-hot-toast";
import { AddItemModal } from "./AddItemModal";

type AddPropertyModalProps = ModalProps & {
    ownerId: string,
}

export function AddPropertyModal(props: AddPropertyModalProps){
   
    const {data, onChange} = useChangeInput({refId: props.ownerId});
    const {onSubmit, loading} = useOnSubmit({
        dataToSubmit: data,
        submissionFunction: addProperty,
        callback: props.onHide,
    });

    const formId = 'add-property-form';

    return (
        <AddItemModal title="Lisää Talo" loading={loading} {...props}>
            <form id={formId} onSubmit={onSubmit}>
                <Form.Group>
                    <label>Osoite<span className="danger">*</span></label>
                    <input name="title" required={true} placeholder="Kirjoita talon osoite..." onChange={onChange}/>
                </Form.Group>

                <Form.Group>
                    <label>Postinumero<span className='danger'>*</span></label>
                    <input name="zipCode" required={true} placeholder="Kirjoita talon postinumero..." onChange={onChange}/>
                </Form.Group>
            </form>

            <FileDropZone
                name="file"
                accept="image/jpeg,application/pdf"
                form={formId}
                onFileUploaded={() => {}}/>
        </AddItemModal>
    )
}