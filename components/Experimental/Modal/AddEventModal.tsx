import { MutableRefObject, forwardRef, useRef } from "react";
import Modal, { ModalRefType } from "./Modal";
import { useAddDataModal } from "./Modal.hooks";
import {add as addEvent} from '@/actions/events';
import { CloseButton } from "@/components/CloseButton";
import { Input, Textarea } from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { Group, Label } from "@/components/Util/FormUtils";

type AddEventModalProps = {
    propertyId: string;
}

function AddEventModal({propertyId}: AddEventModalProps, ref: MutableRefObject<ModalRefType>){
    const formRef = useRef<HTMLFormElement>(null);
    const {onSubmit, cleanup, updateData, status, updateFiles} = useAddDataModal(ref, addEvent, formRef, {refId: propertyId});
    const formId = 'add-event-form';
    
    const loading = status === 'loading';
    
    return (
        <Modal ref={ref}>
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Lisää Tapahtuma</h1>
                <Modal.CloseTrigger>
                    <CloseButton/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={onSubmit} ref={formRef} id={formId} className="flex flex-col gap-4 md:w-[700px] xs:w-full">
                <Input
                name="title"
                label="Otsikko"
                description="Tapahtuman otsikko."
                placeholder="Kirjoita otsikko..."
                required={true}
                autoComplete="off"
                onChange={updateData}/>

            <Input 
                name="time"
                label="Päiväys"
                description="Tapahtuman päivämäärä."
                required
                type="date"
                onChange={updateData}/>

            <Textarea 
                label="Kuvaus" 
                description="Tapahtuman lyhyt kuvaus." 
                placeholder="Kirjoita kuvaus..." 
                spellCheck={false}
                name="description"
                onChange={updateData}/>

            <Input
                name="file"
                type="file"
                accept="application/pdf,image/jpeg"
                label="Tiedostot ja kuvat"
                description="Lähetä samalla tapahtumaan liittyviä tiedostoja ja kuvia."
                multiple={true}
                onInput={updateFiles}/>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Modal.CloseTrigger>
                    <Button variant="secondary" disabled={loading}>
                        <span>Peruuta</span>
                    </Button>
                </Modal.CloseTrigger>

                <Button variant="primary-dashboard" loading={loading} disabled={loading} form={formId}>
                    <span className="mx-8">Lähetä</span>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default forwardRef(AddEventModal);

