import { addProperty } from "kotilogi-app/actions/property/addProperty";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import Form from "kotilogi-app/components/Form/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { useOnSubmit } from "kotilogi-app/hooks/useOnSubmit";
import toast from "react-hot-toast";

type AddPropertyEventModalProps = ModalProps & {
    propertyId: Kotilogi.IdType,
}

export function AddPropertyEventModal(props: AddPropertyEventModalProps){
   
    const {data, onChange} = useChangeInput({refId: props.propertyId});
    const {onSubmit, loading} = useOnSubmit({
        dataToSubmit: data,
        submissionFunction: addPropertyEvent,
        callback: props.onHide,
    });

    const formId = 'add-event-form';

    return (
        <Modal {...props}>
            <Modal.Header>Lisää Talo</Modal.Header>
            <Modal.Body>
                <SplitScreen rightWeight={5}>
                    <form id={formId} onSubmit={onSubmit}>
                        <Form.Group>
                            <label>Otsikko<span className="danger">*</span></label>
                            <input name="title" required={true} placeholder="Kirjoita otsikko..." onChange={onChange}/>
                        </Form.Group>

                        <Form.Group>
                            <label>Päivämäärä</label>
                            <input type="date" name="time" onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <label>Kuvaus</label>
                            <textarea name="description" placeholder="Kirjoita kuvaus..." onChange={onChange} spellCheck={false}/>
                            <Form.SubLabel>Anna tapahtumalle vaihtoehtoinen kuvaus.</Form.SubLabel>
                        </Form.Group>
                    </form>

                    <FileDropZone
                        name="file"
                        accept="image/jpeg,application/pdf"
                        form={formId}
                        onFileUploaded={() => {}}
                    />
                </SplitScreen>
            </Modal.Body>

            <Modal.Footer>
                <SecondaryButton 
                    desktopText="Peruuta" 
                    disabled={loading}
                    onClick={props.onHide}/>

                <PrimaryButton 
                    desktopText="Lähetä" 
                    form={formId}
                    loading={loading}
                    disabled={loading}
                    type="submit"/>
            </Modal.Footer>
        </Modal>
    )
}